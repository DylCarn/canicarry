export function ReturnMarkerGunIcon(reply){
  //"NoGunPolicy" is meant to be a filler for the back end.
  let your_mom = ""
  switch(reply){
     case 'yes':
         your_mom="/NoGunPolicyMarker.png";
         return your_mom;
     case 'no':
         your_mom="/YesGunPolicyMarker.png";
         return your_mom;
     default:
         your_mom="/UnknownGunPolicyMarker.svg";
         return your_mom;
  }
 //{icon:MarkerIconURL, scaledSize: new window.google.maps.Size(40, 40)}
 }