// window.require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs" } });

// window.require(["vs/editor/editor.main"], function () {
//     let editor = monaco.editor.create(document.getElementById('editor-container'), {
//         value: "// Write your code here...",
//         language: "javascript",
//         theme: "vs-light",
//         automaticLayout: true
//     });

//     // Event Listeners
//     document.getElementById("languageSelector").addEventListener("change", (event) => {
//         monaco.editor.setModelLanguage(editor.getModel(), event.target.value);
//     });

//     let isDarkMode = false;
//     document.getElementById("toggleTheme").addEventListener("click", () => {
//         isDarkMode = !isDarkMode;
//         editor.updateOptions({ theme: isDarkMode ? "vs-dark" : "vs-light" });
//     });
// });


window.require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.41.0/min/vs" } });

window.require(["vs/editor/editor.main"], function () {
    let editor = monaco.editor.create(document.getElementById("editor-container"), {
        value: "// Write your code here...",
        language: "javascript",
        theme: "vs-light",
        automaticLayout: true
    });

    // Open File
    document.getElementById("openFile").addEventListener("click", async () => {
        const fileContent = await window.electronAPI.openFile();
        if (fileContent) {
            editor.setValue(fileContent);
        }
    });

    // Save File
    document.getElementById("saveFile").addEventListener("click", async () => {
        const content = editor.getValue();
        const success = await window.electronAPI.saveFile(content);
        if (success) {
            alert("File saved successfully!");
        }
    });

    // Language Selector
    document.getElementById("languageSelector").addEventListener("change", (event) => {
        monaco.editor.setModelLanguage(editor.getModel(), event.target.value);
    });

    // Theme Toggle
    let isDarkMode = false;
    document.getElementById("toggleTheme").addEventListener("click", () => {
        isDarkMode = !isDarkMode;
        editor.updateOptions({ theme: isDarkMode ? "vs-dark" : "vs-light" });
    });
});
