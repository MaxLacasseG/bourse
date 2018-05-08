<?php  
class Controleur {
	protected $modele;
	protected $controleur;
	protected $action;
	protected $gabarit;

	function __construct($modele, $controleur, $action) {
		$this -> modele = new $modele();
		$this -> controleur = $controleur;
		$this -> action = $action;
	}
}
?>