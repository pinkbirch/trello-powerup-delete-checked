function deleteStuff(t) {
	t.card().then(function(x) {
		console.log(x);
	})
};

TrelloPowerUp.initialize({
	'card-buttons': function(t, options){
		return [{
			icon: './images/icon.svg',
			text: 'Delete checked items',
			callback: deleteStuff}];
}
});