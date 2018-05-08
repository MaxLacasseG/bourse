<?php  
class BourseControleur extends Controleur{

	function index($param){

	}

	function afficherDonneesBourse($param){
		$sigles = $param[0];
		$donnees = $this -> modele -> obtenirInfoPrix($sigles);
		
		return json_encode($donnees);
	}

}
?>