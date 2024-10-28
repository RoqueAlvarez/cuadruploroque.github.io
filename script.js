document.getElementById("calculate").addEventListener("click", () => {
    const expression = document.getElementById("expression").value;
    const output = document.getElementById("output");
    output.innerHTML = ""; 

    
    try {
        const result = evaluateExpression(expression);
        output.innerHTML += `<p><strong>Resultado final:</strong> ${result}</p>`;
    } catch (error) {
        output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});

function evaluateExpression(expr) {
    const results = [];
    const cuádruplos = [];

    
    let modifiedExpr = expr.replace(/\(([^()]+)\)/g, (match, innerExpr) => {
        const innerResult = eval(innerExpr);
        results.push(`${innerExpr} = ${innerResult}`);
        cuádruplos.push(`( , ${innerExpr}, , ${innerResult})`);
        return innerResult;
    });

    
    const finalResult = eval(modifiedExpr);
    results.unshift(`Expresión original: ${expr}`); 
    results.push(`Expresión sin paréntesis: ${modifiedExpr}`);
    results.push(`Resultado final: ${finalResult}`);

    
    for (let i = 0; i < results.length; i++) {
        output.innerHTML += `<p>${i + 1}. ${results[i]}</p>`;
    }
    
    
    output.innerHTML += "<h3>Cuádruplos:</h3>";
    cuádruplos.forEach((quad, index) => {
        output.innerHTML += `<p>${index + 1}: ${quad}</p>`;
    });

    return finalResult;
}
