// const editorElement = document.getElementById('editor');
// const openFileButton = document.getElementById('openFile');
// const saveFileButton = document.getElementById('saveFile');
// const toggleThemeButton = document.getElementById('toggleTheme');

// let editor = CodeMirror.fromTextArea(editorElement, {
//     mode: "javascript",
//     lineNumbers: true,
//     theme: "default"
// });

// // Open File
// openFileButton.addEventListener('click', async () => {
//     const content = await window.electronAPI.openFile();
//     if (content) editor.setValue(content);
// });

// // Save File
// saveFileButton.addEventListener('click', async () => {
//     const content = editor.getValue();
//     await window.electronAPI.saveFile(content);
// });

// // Toggle Theme
// let isDarkMode = false;
// toggleThemeButton.addEventListener('click', () => {
//     isDarkMode = !isDarkMode;
//     editor.setOption("theme", isDarkMode ? "monokai" : "default");
// });





window.require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs" } });

window.require(["vs/editor/editor.main"], function () {
    let editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: "// Write your code here...",
        language: "javascript",
        theme: "vs-light",
        automaticLayout: true
    });

    // Event Listeners
    document.getElementById("languageSelector").addEventListener("change", (event) => {
        monaco.editor.setModelLanguage(editor.getModel(), event.target.value);
    });

    let isDarkMode = false;
    document.getElementById("toggleTheme").addEventListener("click", () => {
        isDarkMode = !isDarkMode;
        editor.updateOptions({ theme: isDarkMode ? "vs-dark" : "vs-light" });
    });
});


