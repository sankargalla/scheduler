export const TAB_MENU_ITEMS = [
    { label: 'Home', icon: 'pi pi-fw pi-home', command: () => onHomeClick() },
    { label: 'Settings', icon: 'pi pi-fw pi-cog', command: () => onSettingsClick() },
    { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: '/profile' },
    { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => onLogoutClick() }
  ];
  
  function onHomeClick() {
    // Logic for Home tab click
  }
  
  function onSettingsClick() {
    // Logic for Settings tab click
  }
  
  function onLogoutClick() {
    // Logic for Logout tab click
  }
  