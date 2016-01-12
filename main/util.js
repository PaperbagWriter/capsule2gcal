function getDayCapsule2GCal(lettreJournee)
{
	switch(lettreJournee)
	{
		case 'L':
			return "monday";
			break;
		case'M':
			return "tuesday";
			break;
		case'ME':
			return "wednesday";
			break;
		case'J':
			return "thursday";
			break;
		case'V':
			return "friday";
			break;
	}
}
function getLocationPavillion(nomPavillon)
{
	var map = {
		"Abitibi-Price (ABP)
		Adrien-Pouliot (PLT)
		Agathe-Lacerte (LCT)
		Alexandre-Vachon (VCH)
		Alphonse-Desjardins (ADJ)
		Alphonse-Marie-Parent (PRN)
		Félix-Antoine-Savard (FAS)
		J.-A.-DeSève (DES)
		Boulevard (EDB)
		Gérard-Bisaillon (centrale d'énergie) (GBI et GBA)
		H.-Biermans-L.-Moraud (PBM)
		Jean-Charles-Bonenfant (BNF)
		Maison Michael-John-Brophy (BRY)
		Centrale d'eau refroidie (CER)
		Centre de foresterie des Laurentides (CFL)
		Centre hospitalier de l'Université Laval (CHU)
		Centre universitaire des Appalaches (Saint-Georges) (CUA)
		Charles-De Koninck (DKN)
		Charles-Eugène-Marchand (CHM)
		Jean-Charles-Bonenfant (BNF)
		Louis-Jacques-Casault (CSL)
		Paul-Comtois (CMT)
		Alphonse-Desjardins (ADJ)
		Charles-De Koninck (DKN)
		J.-A.-DeSève (DES)
		Charles-Eugène-Marchand (CHM)
		Envirotron (EVT)
		Ernest-Lemieux (LEM)
		Est (PVE)
		Fabrique (FAB)
		Félix-Antoine-Savard (FAS)
		Ferdinand-Vandry (VND)
		Forêt Montmorency - station expérimentale (FMM)
		Gene-H.-Kruger (GHK)
		Gérard-Bisaillon (centrale d'énergie) (GBI et GBA)
		Gestion des matières dangeureuses (CMD)
		Gene-H.-Kruger (GHK)
		H.-Biermans-L.-Moraud (PBM)
		Héma-Québec (HQ)
		J.-A.-DeSève (DES)
		Jean-Charles-Bonenfant (BNF)
		Louis-Jacques-Casault (CSL)
		Maison Michael-John-Brophy (BRY)
		Gene-H.-Kruger (GHK)
		Agathe-Lacerte (LCT)
		Ernest-Lemieux (LEM)
		H.-Biermans-L.-Moraud (PBM)
		La Laurentienne (LAU)
		La Petite Cité (CHA)
		Lévis (secteur Saint-Romuald) (ROM)
		Louis-Jacques-Casault (CSL)
		Alphonse-Marie-Parent (PRN)
		Charles-Eugène-Marchand (CHM)
		H.-Biermans-L.-Moraud (PBM)
		Maison Couillard (MCO)
		Maison Eugène-Roberge (EGR)
		Maison Marie-Sirois (MRS)
		Maison Michael-John-Brophy (BRY)
		Maison Omer-Gingras (OMG)
		Maurice-Pollack (POL)
		Médecine dentaire (MDE)
		Optique-photonique (COP)
		Abitibi-Price (ABP)
		Adrien-Pouliot (PLT)
		Alphonse-Marie-Parent (PRN)
		Maurice-Pollack (POL)
		Palasis-Prince (PAP)
		Paul-Comtois (CMT)
		Pavillon de l'Éducation physique et des sports (EPS)
		Roger-Van den Hende (RVH)
		Félix-Antoine-Savard (FAS)
		Sciences de l'éducation (TSE)
		Serres haute performance (EVS)
		Services (PSA)
		Stade TELUS-Université Laval (EPS)
		Alexandre-Vachon (VCH)
		Ferdinand-Vandry (VND)
		Roger-Van den Hende (RVH)
		Vieux-Séminaire-de-Québec (SEM)"
	};
}


/*tout les liens pour les addresses des pavillons
for each link ()
{
	get fiche_pavillon_adresse
}*/
var a;
$('#index_listing >div>ul>li>a').each(function(index, element) {
	a = a +	'https://www2.ulaval.ca'+$(this).attr('href') + '\n';
});
console.log(a);