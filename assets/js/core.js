
// --- --- --- START APP -- --- --- ---
let nVersionApp = "1.0.0";
const apps = {
  android: "MEU_LINK_PLAY_STORE",
  ios: "MEU_LINK_APP_STORE",
}

let storage = window.localStorage;

storage.setItem("nVersionApp", nVersionApp);

let notification;

const core = {
  initialize: function(){
    document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
  },

  onDeviceReady: function(){
    document.addEventListener("backbutton", this.onBackButton.bind(this), false);
    document.addEventListener("resume", this.onResume.bind(this), false);
    document.addEventListener("pause", this.onPause.bind(this), false);
  },

  onBackButton: function(e){

    e.preventDefault();

    switch(_ROUTE_.slice(-1).toString()){
      case "main": break;
      case "sidenav": $(".sidenav").sidenav("close"); break;
      case "modal": $(".modal").modal("close"); break;
      case "tab": $(".tabs").tabs("select", "tabMain"); break;
      case "imageOpened": $(".materialboxed").materialbox("close"); $(".lg-close").click(); break;
      case "alert": components.Dialog.close(); break;
      default:
        app.closePage();
      break;
    }
  },

  onResume: function(){},

  onPause: function(){},
};

core.initialize();
