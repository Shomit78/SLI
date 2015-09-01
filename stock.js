(function() {
	$.support.cors = true;
	var stockURL = "https://www.google.com/finance/info?q=LON:SL";
	$.ajax({
		url: stockURL,
		method: "GET",
		headers: { "Accept": "application/json;odata=verbose" },
		success: function (data) {
			var stockHTML = '<div class="sli-stock-info-data-container"><table class="sli-stock-info-data-table">';
			console.info("success");
			var stringData = data.replace("// ", "");
			var obj = JSON.parse(stringData);
			console.info(obj[0]);
			var price = obj[0].l;
			stockHTML += '<tr><td class="sli-stock-info-key-column">Price:&nbsp;<span class="sli-stock-info-value-span">' + price + '</span></td>';
			var change = obj[0].c;
			var changeValue = obj[0].c_fix;
			var changeDirection = change.substring(0, 1);
			if (changeDirection === "+") {
				stockHTML += '<td class="sli-stock-info-key-column">Change:&nbsp;' + 
					'<img src="Stock-Index-Up-icon.png" alt="positive change" class="sli-stock-info-image" /><span class="sli-stock-info-value-span">' + changeValue + '</span></td></tr>';	
			}
			else {
				stockHTML += '<td class="sli-stock-info-key-column">Change:&nbsp;' +
					'<img src="Stock-Index-Down-icon.png" alt="negative change" class="sli-stock-info-image" /><span class="sli-stock-info-value-span">' + changeValue + '</span></td></tr>';
			}
			var lastTrade = new Date(obj[0].lt_dts);
			stockHTML += '<tr><td colspan="2" class="sli-stock-info-key-column">Last trade:&nbsp;<span class="sli-stock-info-value-span">' + lastTrade.toUTCString() + '</span></td></tr>';
			stockHTML += '</table></div>';
			$('#sli-stock-info').html(stockHTML);
		},
		error: function (data) {
			console.error("error");
		}
	});
})();