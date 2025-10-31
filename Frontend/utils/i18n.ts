// utils/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      // Authentification
      welcome_slogan: "La solution que vous cherchez depuis longtemps",
      login: "Se connecter",
      register: "S'inscrire",
      welcome_back: "Bon retour",
      enter_email_or_phone: "Entrez votre email ou téléphone",
      email_or_phone: "Email ou téléphone",
      continue: "Continuer",
      back: "Retour",
      error: "Erreur",
      success: "Succès",
      email_or_phone_required: "Email ou téléphone requis",
      network_error: "Erreur réseau",
      create_account: "Créer un compte",
      join_menni_today: "Rejoignez Menni aujourd'hui",
      full_name: "Nom complet",
      email: "Email",
      phone: "Téléphone",
      password: "Mot de passe",
      confirm_password: "Confirmer le mot de passe",
      all_fields_required: "Tous les champs sont requis",
      passwords_do_not_match: "Les mots de passe ne correspondent pas",
      password_too_short: "Le mot de passe doit avoir au moins 6 caractères",
      account_created: "Compte créé avec succès",
      registration_failed: "Échec de l'inscription",

      // Accueil
      Bonjour: "Bonjour",
      "Rechercher un restaurant ou un service": "Rechercher un restaurant ou un service",
      Catégories: "Catégories",
      Transport: "Transport",
      Voiture: "Voiture",
      Restaurants: "Restaurants",
      "Offres spéciales": "Offres spéciales",
      "1000 XP pour votre prochaine course": "1000 XP pour votre prochaine course",
      "Valable jusqu’à la fin du mois": "Valable jusqu’à la fin du mois",
      "2000 XP pour votre première livraison": "2000 XP pour votre première livraison",
      "Nouveau client seulement": "Nouveau client seulement",
      Accueil: "Accueil",
      Commandes: "Commandes",
      Profil: "Profil",

      // Parcours client – Localisation
      "Choisissez votre trajet": "Choisissez votre trajet",
      "Point de départ (ex: Devant l'église St-Pierre)": "Point de départ (ex: Devant l'église St-Pierre)",
      "Destination (ex: Cap Haïtien)": "Destination (ex: Cap Haïtien)",
      Continuer: "Continuer",

      // Parcours client – Options de service
      "Moto Express": "Moto Express",
      "Voiture Comfort": "Voiture Comfort",
      "Voiture Executive": "Voiture Executive",
      Commander: "Commander",
      "Veuillez choisir un service": "Veuillez choisir un service",

      // Parcours client – Suivi
      "Suivi en temps réel": "Suivi en temps réel",
      "Temps restant": "Temps restant",
      "En route": "En route",
      Appel: "Appel",
      Chat: "Chat",
      "Fonctionnalité non disponible en mode démo": "Fonctionnalité non disponible en mode démo",
      "Annuler la course": "Annuler la course",
      "Êtes-vous sûr de vouloir annuler ?": "Êtes-vous sûr de vouloir annuler ?",
      Oui: "Oui",
      Non: "Non",
      "Fini !": "Fini !",
      "Votre chauffeur est arrivé.": "Votre chauffeur est arrivé.",
    },
  },
  ht: {
    translation: {
      // Authentification
      welcome_slogan: "Solisyon an ou t ap chèche depi lontan",
      login: "Konekte",
      register: "Enskri",
      welcome_back: "Byenveni tounen",
      enter_email_or_phone: "Antre imel ou telefòn ou",
      email_or_phone: "Imel ou telefòn",
      continue: "Kontinye",
      back: "Retounen",
      error: "Erè",
      success: "Siksè",
      email_or_phone_required: "Imel ou telefòn obligatwa",
      network_error: "Erè rezo",
      create_account: "Kreye kont",
      join_menni_today: "Antre nan Menni jodi a",
      full_name: "Non konplè",
      email: "Imel",
      phone: "Telefòn",
      password: "Modpas",
      confirm_password: "Konfime modpas la",
      all_fields_required: "Tout jaden yo obligatwa",
      passwords_do_not_match: "Modpas yo pa matche",
      password_too_short: "Modpas la dwe gen omwen 6 karaktè",
      account_created: "Kont kreye avèk siksè",
      registration_failed: "Enskripsyon echwe",

      // Accueil
      Bonjour: "Bonjou",
      "Rechercher un restaurant ou un service": "Chèche yon restoran oswa yon sèvis",
      Catégories: "Kategori",
      Transport: "Transpò",
      Voiture: "Vwatin",
      Restaurants: "Restoran",
      "Offres spéciales": "Of pèsonèl",
      "1000 XP pour votre prochaine course": "1000 XP pou kou a w vin apre",
      "Valable jusqu’à la fin du mois": "Valid jiska fè mwa a",
      "2000 XP pour votre première livraison": "2000 XP pou livrezon premye w",
      "Nouveau client seulement": "Sèlman pou kliyan nòvo",
      Accueil: "Akyèy",
      Commandes: "Kòmand",
      Profil: "Pwofil",

      // Parcours client – Localisation
      "Choisissez votre trajet": "Chwazi wout ou",
      "Point de départ (ex: Devant l'église St-Pierre)": "Kote ou soti (egz: Devan legliz Sen Pye)",
      "Destination (ex: Cap Haïtien)": "Destinasyon (egz: Okap)",
      Continuer: "Kontinye",

      // Parcours client – Options de service
      "Moto Express": "Moto Ekspres",
      "Voiture Comfort": "Machin Konfò",
      "Voiture Executive": "Machin Egekutif",
      Commander: "Kòmande",
      "Veuillez choisir un service": "Tanpri chwazi yon sèvis",

      // Parcours client – Suivi
      "Suivi en temps réel": "Swivi an tan reyèl",
      "Temps restant": "Tan ki rete",
      "En route": "An wout",
      Appel: "Rele",
      Chat: "Chat",
      "Fonctionnalité non disponible en mode démo": "Fonksyonalite pa disponib nan mòd demo",
      "Annuler la course": "Anile kous la",
      "Êtes-vous sûr de vouloir annuler ?": "Èske w sèten ou vle anile ?",
      Oui: "Wi",
      Non: "Non",
      "Fini !": "Fini !",
      "Votre chauffeur est arrivé.": "Chofè ou a rive.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr', // Langue par défaut
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

export default i18n;