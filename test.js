document.getElementById("fileInput").addEventListener("change", function(event) {
    var file = this.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        // var arrayBuffer = event.target.result;
        // var array = new Uint8Array(arrayBuffer);
        // var fileSize = arrayBuffer.byteLength;
        var new_data;
        new_data += reader.result.replace(/\n/g, '", "');
        new_data += "[" + new_data.slice(0, -2) + "]";
        console.log(new_data);
        // save data to txt file 
        var data = new Blob([new_data], {type: "text/plain"});
        var url = window.URL.createObjectURL(data);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "newWordsArray.txt";
        a.click();
        window.URL.revokeObjectURL(url);
    };
    reader.readAsText(file);
});
//This doesn't work because no NodeJS
// fs.readFile("googe-10000-english-no-swears.txt", (err, data) => {
//     if (err) throw err 
//     var new_data = "[" + data.toString().replace(/\n/g, ",") + "]";
//     fs.writeFile("new-data-array.txt", new_data, (err) => {
//         if (err) throw err;
//         console.log("File has been saved");
//     });
// });