// utils/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      welcome_slogan: "La solution que vous cherchez depuis longtemps",
      login: 'Se connecter',
      register: "S'inscrire",
      welcome_back: 'Bon retour',
      enter_email_or_phone: 'Entrez votre email ou téléphone',
      email_or_phone: 'Email ou téléphone',
      continue: 'Continuer',
      back: 'Retour',
      error: 'Erreur',
      email_or_phone_required: 'Email ou téléphone requis',
      network_error: 'Erreur réseau',
      create_account: 'Créer un compte',
      join_menni_today: 'Rejoignez Menni aujourd\'hui',
      full_name: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      password: 'Mot de passe',
      confirm_password: 'Confirmer le mot de passe',
      all_fields_required: 'Tous les champs sont requis',
      passwords_do_not_match: 'Les mots de passe ne correspondent pas',
      password_too_short: 'Le mot de passe doit avoir au moins 6 caractères',
      success: 'Succès',
      account_created: 'Compte créé avec succès',
      registration_failed: 'Échec de l\'inscription',
    },

          // Dans utils/i18n.ts - section fr
      email_or_phone_required: 'Email ou téléphone requis',
      network_error: 'Erreur réseau',
      all_fields_required: 'Tous les champs sont requis',
      passwords_do_not_match: 'Les mots de passe ne correspondent pas',
      password_too_short: 'Le mot de passe doit avoir au moins 6 caractères',
      account_created: 'Compte créé avec succès',
      registration_failed: "Échec de l'inscription",
      enter_email_or_phone: 'Entrez votre email ou téléphone',
        },
  ht: {
    translation: {
      welcome_slogan: "Solisyon an ou t ap chèche depi lontan",
      login: 'Konekte',
      register: "Enskri",
      welcome_back: 'Byenveni tounen',
      enter_email_or_phone: 'Antre imel ou telefòn ou',
      email_or_phone: 'Imel ou telefòn',
      continue: 'Kontinye',
      back: 'Retounen',
      error: 'Erè',
      email_or_phone_required: 'Imel ou telefòn obligatwa',
      network_error: 'Erè rezo',
      create_account: 'Kreye kont',
      join_menni_today: 'Antre nan Menni jodi a',
      full_name: 'Non konplè',
      email: 'Imel',
      phone: 'Telefòn',
      password: 'Modpas',
      confirm_password: 'Konfime modpas la',
      all_fields_required: 'Tout jaden yo obligatwa',
      passwords_do_not_match: 'Modpas yo pa matche',
      password_too_short: 'Modpas la dwe gen omwen 6 karaktè',
      success: 'Siksè',
      account_created: 'Kont kreye avèk siksè',
      registration_failed: 'Enskripsyon echwe',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
  
});

export default i18n;