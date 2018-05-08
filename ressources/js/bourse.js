// Bien organiser tout le code dans un espace de nommage anonyme
(function() {
	// Le code à exécuter lorsque l'événement "DOM Ready" est déclenché ci-dessous.
	$(function() {
		/*
			A) Vos gestionnaires d'événements "statiques" ici
		*/
		//Si la touche Enter est enfoncée, appeler le contrôleur Bourse en
		//passant la valeur du champ en paramètre
		$(".sigle-compagnie").on("keypress", function(evt){
			if(evt.key == "Enter"){
				chercherDonnees($(".sigle-compagnie")[0].value);
			};
		});

		/*
			B) Vos gestionnaires d'événements "délégués" ici
		*/
		$("ul.liste-sigles").on("click", ".btn-maj",function(){
			//console.log($(this));
			$this = $(this);
			rafraichirDonnees($this.parent().data("id"));
		});

	});

	// Fonction servant à faire une requête Ajax avec les infos saisies dans le champs
	function chercherDonnees(donnees){
		$.ajax({
			url : "index.php?route=bourse/afficherDonneesBourse/" + donnees,
			method:"POST"
		}).done(gererDonneesBourse);
	}

	//Fonction servant afficher les données en clonant
	function gererDonneesBourse(donnees){
		var nbSigles = donnees.length;
		var $gabaritSigle;
		
		//Pour chaque cours
		for(var i=0; i<nbSigles; i++){

			//On clone le template
			$gabaritSigle = $(".info-compagnie.gabarit").clone().removeClass("gabarit");
			
			//Insérer le contenu et attribut dans le gabarit
			$("span.sigle", $gabaritSigle).text(donnees[i].sigle);
			$("span.bourse", $gabaritSigle).text(donnees[i].bourse);
			$("span.prix", $gabaritSigle).text(donnees[i].prix);
			$("span.temps", $gabaritSigle).text(donnees[i].temps);
			$gabaritSigle.attr("data-id", donnees[i].bourse + ":" + donnees[i].sigle);

			//On ajoute le code au HTML
			$(".info-compagnie.gabarit").parent().append($gabaritSigle);
		}
		
	}


	function rafraichirDonnees(donnees){
		$.ajax({
			url : "index.php?route=bourse/afficherDonneesBourse/" + donnees,
			method:"POST"
		}).done(afficherRafraichissement);
	}



	function afficherRafraichissement(donnees){
		//console.log($(".info-compagnie[data-id='NASDAQ:AAPL']"));
		$li = $('.info-compagnie[data-id="' + donnees[0].bourse + ':' + donnees[0].sigle + '"]');
			//Insérer le contenu et attribut dans le gabarit
			$("span.prix", $li).text(donnees[0].prix);
			$("span.temps", $li).text(donnees[0].temps);
	}

})();