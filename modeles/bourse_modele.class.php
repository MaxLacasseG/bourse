<?php  
class BourseModele {
	/**
	 * Obtenir l'info sur le prix d'actions en bourse en temps réel
	 * @param  string $siglesCompagnies Sigles de compagnies en bourse dans le
	 *                                  format suivant : 
	 *                                  NASDAQ:AAPL[,NYSE:IBM][,...]
	 * @return array|false  Tableau contenant les résultats sous forme de tableaux 
	 *                      associatifs PHP, ou la valeur booléenne false s'il n'y 
	 *                      a pas de résultat
	 */
	function obtenirInfoPrix($siglesCompagnies) {
		$url = 'http://finance.google.com/finance/info?q='.$siglesCompagnies;
		$contenu = file_get_contents($url);
		preg_match('/\/\/ (.*)\s?$/Us', $contenu, $resultat);
		if($resultat) {
			$tabCompagnies = json_decode($resultat[1]);
			$info = array();
			foreach ($tabCompagnies as $compagnie) {
				$info[] = array(
										"sigle" => $compagnie -> t,
										"bourse" => $compagnie -> e,
										"prix" => $compagnie -> l_cur,
										"temps" => $compagnie -> lt_dts
									);
			}
			return $info;
		}
		else {
			return false;
		}
	}
}
?>