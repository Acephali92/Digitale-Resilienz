/**
 * SecuChart - Interactive Comparison Table
 * Inspired by bkil.gitlab.io/secuchart
 */

/**
 * Security utilities for SecuChart
 * Provides XSS protection without external dependencies
 */
const SecuChartSecurity = {
    /**
     * Escape HTML special characters to prevent XSS
     * Uses DOM-based escaping for safety
     * @param {string} text - Untrusted text to escape
     * @returns {string} - Safe HTML-escaped text
     */
    escapeHtml: function(text) {
        if (text === null || text === undefined) {
            return '';
        }
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    },

    /**
     * Validate status value against whitelist
     * @param {string} status - Status value to validate
     * @returns {string} - Valid status or 'unknown'
     */
    validateStatus: function(status) {
        const validStatuses = ['yes', 'partial', 'no', 'unknown'];
        return validStatuses.includes(status) ? status : 'unknown';
    },

    /**
     * Sanitize note text with length limit and character restrictions
     * @param {string} note - Note text to sanitize
     * @param {number} maxLength - Maximum allowed length (default 500)
     * @returns {string} - Sanitized note
     */
    sanitizeNote: function(note, maxLength = 500) {
        if (!note || typeof note !== 'string') {
            return '';
        }
        // Trim and limit length
        let sanitized = note.trim().substring(0, maxLength);
        // Remove null bytes and control characters (except newlines)
        sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
        return sanitized;
    }
};

class SecuChart {
    constructor(options) {
        this.container = document.getElementById(options.containerId);
        this.originalData = JSON.parse(JSON.stringify(options.data));
        this.currentData = JSON.parse(JSON.stringify(options.data));
        this.changes = {};
        this.activeEditor = null;

        this.statusSymbols = {
            yes: '✓',
            partial: '~',
            no: '✗',
            unknown: '?'
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateChangesPanel();
        this.setupBeforeUnload();
    }

    bindEvents() {
        // Cell click handler
        this.container.addEventListener('click', (e) => {
            const cell = e.target.closest('.status-cell');
            if (cell && !cell.classList.contains('editing')) {
                this.openEditor(cell);
            }
        });

        // Close editor on outside click
        document.addEventListener('click', (e) => {
            if (this.activeEditor && !e.target.closest('.cell-editor') && !e.target.closest('.status-cell')) {
                this.closeEditor();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeEditor) {
                this.closeEditor();
            }
        });

        // Tooltip on hover
        this.container.addEventListener('mouseover', (e) => {
            const cell = e.target.closest('.status-cell');
            if (cell) {
                this.showTooltip(cell, e);
            }
        });

        this.container.addEventListener('mouseout', (e) => {
            if (e.target.closest('.status-cell')) {
                this.hideTooltip();
            }
        });

        // Changes panel buttons
        document.getElementById('btnShowDiff')?.addEventListener('click', () => this.toggleDiff());
        document.getElementById('btnCopyPatch')?.addEventListener('click', () => this.copyPatch());
        document.getElementById('btnDiscard')?.addEventListener('click', () => this.discardChanges());
    }

    openEditor(cell) {
        this.closeEditor();

        const sourceId = cell.dataset.source;
        const propId = cell.dataset.property;
        const currentStatus = SecuChartSecurity.validateStatus(this.getCurrentStatus(sourceId, propId));
        const currentNote = SecuChartSecurity.sanitizeNote(this.getCurrentNote(sourceId, propId));

        cell.classList.add('editing');

        // Build editor using safe DOM methods (no innerHTML with user data)
        const editor = document.createElement('div');
        editor.className = 'cell-editor';

        // Title
        const title = document.createElement('div');
        title.className = 'cell-editor-title';
        title.textContent = 'Status aendern';
        editor.appendChild(title);

        // Options container
        const options = document.createElement('div');
        options.className = 'cell-editor-options';

        const statusOptions = [
            { status: 'yes', label: '\u2713 Ja', cssClass: 'opt-yes' },
            { status: 'partial', label: '~ Teil', cssClass: 'opt-partial' },
            { status: 'no', label: '\u2717 Nein', cssClass: 'opt-no' },
            { status: 'unknown', label: '? ???', cssClass: 'opt-unknown' }
        ];

        statusOptions.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = `cell-editor-option ${opt.cssClass}${currentStatus === opt.status ? ' selected' : ''}`;
            btn.dataset.status = opt.status;
            btn.textContent = opt.label;
            btn.addEventListener('click', () => {
                options.querySelectorAll('.cell-editor-option').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
            options.appendChild(btn);
        });
        editor.appendChild(options);

        // Textarea for notes (use .value for safe assignment)
        const textarea = document.createElement('textarea');
        textarea.className = 'cell-editor-note';
        textarea.placeholder = 'Notiz (optional)';
        textarea.rows = 2;
        textarea.maxLength = 500;
        textarea.value = currentNote;
        editor.appendChild(textarea);

        // Actions container
        const actions = document.createElement('div');
        actions.className = 'cell-editor-actions';

        const saveBtn = document.createElement('button');
        saveBtn.className = 'cell-editor-btn btn-save';
        saveBtn.textContent = 'Speichern';
        saveBtn.addEventListener('click', () => {
            const selectedStatus = editor.querySelector('.cell-editor-option.selected')?.dataset.status;
            const note = textarea.value;
            if (selectedStatus) {
                this.updateCell(sourceId, propId, selectedStatus, note);
            }
            this.closeEditor();
        });
        actions.appendChild(saveBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'cell-editor-btn btn-cancel';
        cancelBtn.textContent = 'Abbrechen';
        cancelBtn.addEventListener('click', () => {
            this.closeEditor();
        });
        actions.appendChild(cancelBtn);

        editor.appendChild(actions);

        cell.style.position = 'relative';
        cell.appendChild(editor);
        this.activeEditor = { cell, editor, sourceId, propId };

        // Focus note textarea
        textarea.focus();
    }

    closeEditor() {
        if (this.activeEditor) {
            this.activeEditor.cell.classList.remove('editing');
            this.activeEditor.editor.remove();
            this.activeEditor = null;
        }
    }

    getCurrentStatus(sourceId, propId) {
        const source = this.currentData.sources.find(s => s.id === sourceId);
        return source?.properties[propId]?.status || 'unknown';
    }

    getCurrentNote(sourceId, propId) {
        const source = this.currentData.sources.find(s => s.id === sourceId);
        return source?.properties[propId]?.note || '';
    }

    getOriginalStatus(sourceId, propId) {
        const source = this.originalData.sources.find(s => s.id === sourceId);
        return source?.properties[propId]?.status || 'unknown';
    }

    getOriginalNote(sourceId, propId) {
        const source = this.originalData.sources.find(s => s.id === sourceId);
        return source?.properties[propId]?.note || '';
    }

    updateCell(sourceId, propId, status, note) {
        // Input validation
        status = SecuChartSecurity.validateStatus(status);
        note = SecuChartSecurity.sanitizeNote(note, 500);

        const source = this.currentData.sources.find(s => s.id === sourceId);
        if (!source) return;

        if (!source.properties[propId]) {
            source.properties[propId] = {};
        }

        source.properties[propId].status = status;
        source.properties[propId].note = note;

        // Track changes
        const changeKey = `${sourceId}.${propId}`;
        const originalStatus = this.getOriginalStatus(sourceId, propId);
        const originalNote = this.getOriginalNote(sourceId, propId);

        if (status !== originalStatus || note !== originalNote) {
            this.changes[changeKey] = {
                sourceId,
                propId,
                original: { status: originalStatus, note: originalNote },
                new: { status, note }
            };
        } else {
            delete this.changes[changeKey];
        }

        // Update UI
        this.renderCell(sourceId, propId);
        this.updateChangesPanel();
    }

    renderCell(sourceId, propId) {
        // Use CSS.escape for safe querySelector (prevents selector injection)
        const cell = this.container.querySelector(
            `[data-source="${CSS.escape(sourceId)}"][data-property="${CSS.escape(propId)}"]`
        );
        if (!cell) return;

        // Validate status against whitelist
        const status = SecuChartSecurity.validateStatus(this.getCurrentStatus(sourceId, propId));
        const note = this.getCurrentNote(sourceId, propId);
        const changeKey = `${sourceId}.${propId}`;
        const isModified = this.changes[changeKey];

        // Build cell content safely using DOM methods (no innerHTML)
        cell.textContent = '';

        const indicator = document.createElement('span');
        indicator.className = `status-indicator status-${status}`;
        indicator.textContent = this.statusSymbols[status] || '?';
        cell.appendChild(indicator);

        if (note) {
            const noteIndicator = document.createElement('span');
            noteIndicator.className = 'note-indicator';
            noteIndicator.textContent = '\uD83D\uDCDD';
            cell.appendChild(noteIndicator);
        }

        cell.classList.toggle('modified', !!isModified);
    }

    updateChangesPanel() {
        const panel = document.getElementById('changesPanel');
        const countEl = document.getElementById('changesCount');
        const diffDisplay = document.getElementById('diffDisplay');
        const jsonOutput = document.getElementById('jsonOutput');

        const changeCount = Object.keys(this.changes).length;

        if (countEl) {
            countEl.textContent = changeCount;
        }

        if (panel) {
            panel.classList.toggle('hidden', changeCount === 0);
        }

        // Update diff display safely (no innerHTML)
        if (diffDisplay) {
            diffDisplay.textContent = '';
            diffDisplay.appendChild(this.generateDiffElements());
        }

        // Update JSON output safely (no innerHTML with user data)
        if (jsonOutput) {
            jsonOutput.textContent = '';
            const pre = document.createElement('pre');
            pre.textContent = JSON.stringify(this.generatePatch(), null, 2);
            jsonOutput.appendChild(pre);
        }

        // Update unsaved warning
        const warning = document.getElementById('unsavedWarning');
        if (warning) {
            warning.classList.toggle('visible', changeCount > 0);
        }
    }

    generateDiffElements() {
        // Return DocumentFragment with safe DOM elements (no innerHTML with user data)
        const fragment = document.createDocumentFragment();

        if (Object.keys(this.changes).length === 0) {
            const noChanges = document.createElement('p');
            noChanges.style.color = 'var(--color-text-dim)';
            noChanges.textContent = 'Keine Aenderungen';
            fragment.appendChild(noChanges);
            return fragment;
        }

        for (const [key, change] of Object.entries(this.changes)) {
            // Safely retrieve names with defensive checks
            const sources = this.currentData?.sources || [];
            const sourceName = sources.find(s => s && s.id === change.sourceId)?.name || change.sourceId;
            const propName = this.currentData?.properties_meta?.properties?.[change.propId]?.name || change.propId;

            const diffItem = document.createElement('div');
            diffItem.className = 'diff-item';

            const diffPath = document.createElement('div');
            diffPath.className = 'diff-path';
            diffPath.textContent = `${sourceName} \u2192 ${propName}`;
            diffItem.appendChild(diffPath);

            const diffOld = document.createElement('div');
            diffOld.className = 'diff-old';
            const oldStatus = SecuChartSecurity.validateStatus(change.original.status);
            const oldNote = change.original.note ? ` (${SecuChartSecurity.sanitizeNote(change.original.note)})` : '';
            diffOld.textContent = `- ${oldStatus}${oldNote}`;
            diffItem.appendChild(diffOld);

            const diffNew = document.createElement('div');
            diffNew.className = 'diff-new';
            const newStatus = SecuChartSecurity.validateStatus(change.new.status);
            const newNote = change.new.note ? ` (${SecuChartSecurity.sanitizeNote(change.new.note)})` : '';
            diffNew.textContent = `+ ${newStatus}${newNote}`;
            diffItem.appendChild(diffNew);

            fragment.appendChild(diffItem);
        }

        return fragment;
    }

    generatePatch() {
        const patch = {
            generated: new Date().toISOString(),
            changes: []
        };

        for (const change of Object.values(this.changes)) {
            patch.changes.push({
                source: change.sourceId,
                property: change.propId,
                from: change.original,
                to: change.new
            });
        }

        return patch;
    }

    toggleDiff() {
        const diffDisplay = document.getElementById('diffDisplay');
        const jsonOutput = document.getElementById('jsonOutput');

        if (diffDisplay) {
            diffDisplay.classList.toggle('visible');
        }
        if (jsonOutput) {
            jsonOutput.classList.remove('visible');
        }
    }

    async copyPatch() {
        const btn = document.getElementById('btnCopyPatch');
        const patch = JSON.stringify(this.generatePatch(), null, 2);

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(patch);
            } else {
                // Fallback
                const textarea = document.createElement('textarea');
                textarea.value = patch;
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }

            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = '✓ Kopiert!';
                btn.classList.add('success');
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('success');
                }, 2000);
            }
        } catch (err) {
            console.error('Copy failed:', err);
            if (btn) {
                btn.textContent = '✗ Fehler';
            }
        }

        // Show JSON output
        const jsonOutput = document.getElementById('jsonOutput');
        if (jsonOutput) {
            jsonOutput.classList.add('visible');
        }
    }

    discardChanges() {
        if (!confirm('Alle Aenderungen verwerfen?')) return;

        this.currentData = JSON.parse(JSON.stringify(this.originalData));

        // Re-render all modified cells
        for (const changeKey of Object.keys(this.changes)) {
            const [sourceId, propId] = changeKey.split('.');
            this.renderCell(sourceId, propId);
        }

        this.changes = {};
        this.updateChangesPanel();
    }

    showTooltip(cell, event) {
        const sourceId = cell.dataset.source;
        const propId = cell.dataset.property;
        const note = this.getCurrentNote(sourceId, propId);

        if (!note) return;

        let tooltip = document.getElementById('secuchartTooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'secuchartTooltip';
            tooltip.className = 'secuchart-tooltip';
            document.body.appendChild(tooltip);
        }

        tooltip.textContent = note;
        tooltip.style.display = 'block';
        tooltip.style.left = event.pageX + 10 + 'px';
        tooltip.style.top = event.pageY + 10 + 'px';
    }

    hideTooltip() {
        const tooltip = document.getElementById('secuchartTooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    setupBeforeUnload() {
        window.addEventListener('beforeunload', (e) => {
            if (Object.keys(this.changes).length > 0) {
                e.preventDefault();
                e.returnValue = 'Du hast ungespeicherte Aenderungen. Wirklich verlassen?';
                return e.returnValue;
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const dataEl = document.getElementById('secuchartData');
    if (dataEl) {
        try {
            const data = JSON.parse(dataEl.textContent);
            window.secuChart = new SecuChart({
                containerId: 'secuchartTable',
                data: data
            });
        } catch (err) {
            console.error('Failed to initialize SecuChart:', err);
        }
    }
});
