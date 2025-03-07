const editorElement = document.getElementById('editor');
const openFileButton = document.getElementById('openFile');
const saveFileButton = document.getElementById('saveFile');
const toggleThemeButton = document.getElementById('toggleTheme');

let editor = CodeMirror.fromTextArea(editorElement, {
    mode: "javascript",
    lineNumbers: true,
    theme: "default"
});

// Open File
openFileButton.addEventListener('click', async () => {
    const content = await window.electronAPI.openFile();
    if (content) editor.setValue(content);
});

// Save File
saveFileButton.addEventListener('click', async () => {
    const content = editor.getValue();
    await window.electronAPI.saveFile(content);
});

// Toggle Theme
let isDarkMode = false;
toggleThemeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    editor.setOption("theme", isDarkMode ? "monokai" : "default");
});
