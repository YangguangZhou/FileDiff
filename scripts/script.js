window.onload = function() {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const dmp = new diff_match_patch();

    function compareTexts() {
        var text1 = input1.value;
        var text2 = input2.value;
        var diff = dmp.diff_main(text1, text2);
        dmp.diff_cleanupSemantic(diff);
        var ds = dmp.diff_prettyHtml(diff);
        ds = ds.replace(/&para;/g, ''); // 添加这一行
        document.getElementById('output2').innerHTML = '<pre>' + ds + '</pre>';
        document.getElementById('count1').innerText = '字数: ' + text1.length;
        document.getElementById('count2').innerText = '字数: ' + text2.length;
        var similarity = dmp.diff_levenshtein(diff) / Math.max(text1.length, text2.length); // 修改这一行
        document.getElementById('similarity').innerText = '相似度: ' + ((1 - similarity) * 100).toFixed(2) + '%';
    }

    input1.addEventListener('input', compareTexts);
    input2.addEventListener('input', compareTexts);
}