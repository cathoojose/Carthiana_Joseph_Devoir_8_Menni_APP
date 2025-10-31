

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  AppTabs: undefined;
  ServiceOptions: { 
    departure: string; 
    destination: string;
    serviceType?: string;
  };

  RideConfirmation: {
    departure: string;
    destination: string;
    service: any;
    driver: any;
  };
  
  Tracking: { 
    departure: string;
    destination: string; 
    service: any;
    driver: any;

    EditProfileScreen: undefined;
    ChangePasswordScreen: undefined;
    LanguageSelectionScreen: undefined;
  };
};
 

export type AppTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};