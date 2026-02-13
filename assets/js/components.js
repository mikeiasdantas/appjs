var components = {
    Preloader: function(attrs){
      attrs = (typeof attrs == "undefined") ? {} : attrs;
      attrs.color = (typeof attrs.color == "undefined") ? "yellow" : attrs.color;
      
      attrs.label = (typeof attrs.label == "undefined") ? {} : attrs.label;
      attrs.label.text = (typeof attrs.label.text == "undefined") ? "AGUARDE..." : attrs.label.text;
      attrs.label.classes = (typeof attrs.label.classes == "undefined") ? "grey-text fs9" : attrs.label.classes;
      
      return `<center id="preloader"><div style='padding:10px 0;'><div class='preloader-wrapper small active'><div class='spinner-layer spinner-${attrs.color}-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div><div><span class='${attrs.label.classes}'>${attrs.label.text}</span></center>`;
    },
  
    openInnerLoading: function(attrs){
        if(typeof attrs == "undefined") attrs = {};
        if(typeof attrs.instance == "undefined") attrs.instance = "innerLoading";
        if(typeof attrs.background == "undefined") attrs.background = "";
        if(typeof attrs.distance == "undefined") attrs.distance = "56";
        if(typeof attrs.color == "undefined") attrs.color = "yellow";
  
      return `<div id="${attrs.instance}" class="${attrs.background} vh100 w100" style="z-index: 5; left: 0px;"><div style="top: calc(50vh - ${attrs.distance}px); position: relative;">${components.Preloader({color: attrs.color})}</div></div>`;
    },
  
    closeInnerLoading: function(instance = "innerLoading"){
      $(`#${instance}`).fadeOut("slow", function(){ $(this).remove()});
    },
  
    openLoading: function(){
      components.closeLoading();
  
      $("body").append(
        `<div id="loading" class="loading2">
        <center><div style="padding:10px 0;"><div class="preloader-wrapper small active"><div class="spinner-layer spinner-yellow-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div><div></center>
        </div>`
      );
    },
  
    closeLoading: function(){
      $("#loading").remove();
    },
  
    Progress: function(overHeight){
      if(typeof overHeight == "undefined") overHeight = 56;
      return `<div id="preloader" class="valign-wrapper" style="height: calc(100vh - ${overHeight}px);">
                <div class="progress amber lighten-4" style="width: 50%; left: calc(50% - 25%);">
                  <div class="indeterminate amber"></div>
                </div>
              </div>`
    },
  
    Progress2: function(attrs){
      if(typeof attrs == "undefined") attrs = {};
      if(typeof attrs.preloader.style == "undefined") attrs.preloader.style = {};
  
      return `<div id="preloader" class="valign-wrapper" style="${JSON.stringify(attrs.preloader.style).replace(/"/g,'').replace(/,/g,'; ').replace(/\}/g, ';').replace(/{/g, "")}">
                <div class="progress amber lighten-4" style="width: 50%; left: calc(50% - 25%);">
                  <div class="indeterminate amber"></div>
                </div>
              </div>`;
    },
  
  
    Error: function(sFunctionReload, overHeight){
      if(typeof overHeight == "undefined") overHeight = 56;
      return `<div class="valign-wrapper white" style="height: calc(100vh - ${overHeight}px);">
                <div class="center-align" style="width:100%;">
                  <span class="fa fa-exclamation-triangle fs90 grey-text text-lighten-2 bold"></span><br/><br/>
                  <span class="fs12 grey-text"><b class="grey-text text-darken-2 fs14">Ocorreu um erro, acontece...</b><br/>Verifique sua conexão com a Internet e tente novamente.</span><br/><br/>
                </div>
              </div>`;
    },
  
    Empty: function(sIcon, sMsg, sFunction, overHeight){
      if(typeof overHeight == "undefined") overHeight = 56;
      return `<div class="valign-wrapper transparent" style="height: calc(100dvh - ${overHeight}px);">
        <div class="center-align" style="width:100%;">
          <span class="fa ${sIcon} fs90 bold"></span><br/><br/>
          <span class="grey-text text-darken-2 fs12">${sMsg}</span><br/><br/>
        </div>
      </div>`;
    },
  
    Dialog: {
  
      _instance: null,
      
      attr: {
        icon: null,
        title: false,
        backgroundDismiss: true,
        closeIcon: false,
        content: "",
        buttons: {},
        onContentReady: function(){},
        onOpenBefore: function(){
          _ROUTE_.push("alert");
        },
        onClose: function(){
          _ROUTE_.pop();
        },
        onDestroy: function(){},
        type: "amber",
        animation: "scale",
      },
  
      show: function(obj){
        //this.reset();
  
        this.attr.icon = (typeof obj.icon == "undefined") ? "" : obj.icon;
        this.attr.type = (typeof obj.color == "undefined") ? "" : obj.color;
        this.attr.title = (typeof obj.title == "undefined") ? "" : obj.title;
        this.attr.backgroundDismiss = (typeof obj.backgroundDismiss == "undefined") ? true : obj.backgroundDismiss;
        this.attr.closeIcon = (typeof obj.closeIcon == "undefined") ? false : obj.closeIcon;
        this.attr.content = (typeof obj.content == "undefined") ? false : obj.content;
        this.attr.buttons = obj.buttons;
  
        if(typeof obj.onContentReady == "undefined") this.attr.onContentReady = null;
        else {
          this.attr.content = components.Preloader();
          this.attr.onContentReady = obj.onContentReady;
        }
  
        this.attr.onClose = (typeof obj.onClose == "function") ? obj.onClose : this.attr.onClose;
        this.attr.onDestroy = (typeof obj.onDestroy == "function") ? obj.onDestroy : this.attr.onDestroy;
  
        switch(obj.type){
          case "dialog": this._instance = $.dialog(this.attr); break;
          case "confirm": this._instance = $.confirm(this.attr); break;
          case "alert": this._instance = $.alert(this.attr); break;
        }
  
        this.reset();
      },
  
      close: function(){
        this.reset();
        if(this._instance != null) this._instance.close();
      },
  
      reset: function(){
        //RESET ATTRIBUTES AFTER SHOW
        this.attr.icon = null;
        this.attr.title = false;
        this.attr.backgroundDismiss = true;
        this.attr.content = "";
        this.attr.buttons = {};
        this.attr.closeIcon = false;
        this.attr.animation = "scale";
  
        this.attr.onOpenBefore = function(){
          _ROUTE_.push("alert");
        };
  
        this.attr.onClose = function(){
          _ROUTE_.pop();
        };
  
        this.attr.onOpen = function(){};
        this.attr.onContentReady = function(){};
        this.attr.onDestroy = function(){};
      },
  
      msg: function(arrMsg){
        return `<center><br/><br/>
              <span class="fa ${arrMsg[0]} fs90 bold"></span><br/><br/>
              <span class="fs12 grey-text"><b class="grey-text text-darken-2 fs14">${arrMsg[1]}</b><br/>${arrMsg[2]}</span><br/><br/>
            </center>`;
      },
  
      error: function(){
        return `<center><br/><br/>
              <span class="fa fa-exclamation-triangle fs90 grey-text text-lighten-2 bold"></span><br/><br/>
              <span class="fs12 grey-text"><b class="grey-text text-darken-2 fs14">Ocorreu um erro</b><br/>Verifique sua conexão com a Internet.</span><br/><br/>
            </center>`;
      }
    },
  
    FormatMoney: function(curTotal){
      if(curTotal > 0){
        var v = curTotal+'';
        v=v.replace(/\D/g,'');
        v=v.replace(/(\d{1,2})$/, ',$1');  
        v=v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');           
        v = v != '' ? 'R$ '+v : '';
        //v = v == "R$ ,0" ? "R$ 0,00" : v;
      } else { curTotal = 0; v = "R$ 0,00"; }
  
      return v;
    },
  
    navBarFixed: {
      default: function(attrs){
        if(typeof attrs == "undefined") attrs = {};
        if(typeof attrs.classes == "undefined") attrs.classes = "white";
        if(typeof attrs.actions == "undefined") attrs.actions = "";
        if(typeof attrs.navextended == "undefined") attrs.navextended = attrs.extended = ""; else attrs.extended = "nav-extended";

        return `<div class="navbar-fixed"> 
          <nav class="${attrs.extended} ${attrs.classes}" style="height: 70px;">
            <div class="nav-wrapper z-depth-0 truncate fs20 rounded-20 center">
              <a href="javascript:;" data-target="sidenav-mobile" class="sidenav-trigger">
                <i class="fa fa-bars white-text fs20 left"></i>
              </a>

              <!--<a href="javascript:;" class="sidenav-back" onclick="" style="position: absolute !important; right: 10px; bottom: -4px;"><i class="fa fa-share-alt"></i></a>-->

              <!--<center><img class="wow fadeInUp" src="assets/img/logo.png" height="20px" style="margin-bottom: 30px; "></center>-->

              <span>Meu Aplicativo</span>

              <div class="right rightActions">
                ${attrs.actions}
              </div>
            </div>

            <div class="nav-content">
              ${attrs.navextended}
            </div>
          </nav>
        </div>`;
      },
  
      back: function(attrs){
  
        if(typeof attrs == "undefined") attrs = {};
        if(typeof attrs.title == "undefined") attrs.title = "";
        if(typeof attrs.back == "undefined") attrs.back = null;
        if(typeof attrs.actions == "undefined") attrs.actions = "";
        if(typeof attrs.classes == "undefined") attrs.classes = "grey-text text-darken-2 white-90";
        if(typeof attrs.classHeader == "undefined") attrs.classHeader = "";
        if(typeof attrs.titleClass == "undefined") attrs.titleClass = "";

  
        attrs.close = (typeof attrs.close == "undefined" || attrs.close === false) ? {class: "", icon: "chevron-left"} : {class: "right", icon: "times"};
  
        var truncateTitle = ((attrs.actions).length > 0) ? "width: calc(100% - 220px);" : "";
  
        return `
        <div class="navbar-fixed ${attrs.classHeader}">
          <nav class="transparent z-depth-0">
            <div class="nav-wrapper border-bottom1 truncate ${attrs.classes}">
              <a href="javascript:;" id="btnBack" class="sidenav-back ${attrs.close.class}" onclick="${attrs.back}">
                <i class="fa fa-${attrs.close.icon} fs20 ${attrs.classes}"></i>
              </a>
              <div class="right rightActions">
                ${attrs.actions}
              </div>
              <div class="fs16 truncate ${attrs.titleClass}" style="${truncateTitle}">${attrs.title}</div>
            </div>
          </nav>
        </div>`;
      },
  
      backExtended: function(attrs = {title: "", back: null, actions: "", navcontent: ""}){
        
        if(typeof attrs == "undefined") attrs = {};
        if(typeof attrs.title == "undefined") attrs.title = "";
        if(typeof attrs.back == "undefined") attrs.back = "";
        if(typeof attrs.actions == "undefined") attrs.actions = "";
        if(typeof attrs.classes == "undefined") attrs.classes = "grey-text text-darken-2 white";
        if(typeof attrs.navcontent == "undefined") attrs.navcontent = "";
        if(typeof attrs.titleClass == "undefined") attrs.titleClass = "";
        
  
        return `<div class="navbar-fixed" style="height:104px">
          <nav class="nav-extended ${attrs.classes} z-depth-0">
  
            <div class="nav-wrapper ${attrs.classes}">
              <a href="javascript:;" class="sidenav-back" onclick="${attrs.back}">
                <i class="fa fa-chevron-left grey-text fs20"></i>
              </a>
              <div class="right rightActions">${attrs.actions}</div>
              <div class="fs16 ${attrs.titleClass}" style="width: calc(100% - 45px);">${attrs.title}</div>
            </div>
          
            <div class="nav-content">
              ${attrs.navcontent}
            </div>
          </nav>
        </div>`
      },
  
      rightActions: function(attrs){
        if(typeof attrs == "undefined") attrs = {};
        if(typeof attrs.actions == "undefined") attrs.actions = "";
  
        $("nav .rightActions").html(attrs.actions);
      },
    },
  
    modal: {
      obj: null,
      
      init: function(attrs){
        if(typeof attrs == "undefined") attrs = {};
        if(typeof attrs.obj == "undefined") attrs.obj = "modal";
        if(typeof attrs.classes == "undefined") attrs.classes = "";
        if(typeof attrs.classesContent == "undefined") attrs.classesContent = "";
        if(typeof attrs.actionCloseStart == "undefined") attrs.actionCloseStart = "";
        if(typeof attrs.actionCloseEnd == "undefined") attrs.actionCloseEnd = "";
        
  
        this.obj = `#${attrs.obj}`;
  
        $("main").append(
          `<div id="${attrs.obj}" class="modal ${attrs.classes}">
            <div class="modal-content ${attrs.classesContent}"></div>
          </div>`
        );
  
        var modal = this.obj;
  
        $(this.obj).modal({
          onOpenStart: function(){ _ROUTE_.push("modal"); },
          onCloseStart: function(){
            _ROUTE_.pop();
            eval(attrs.actionCloseStart);
          },
          onCloseEnd: function(){
            components.modal.erase(modal);
            eval(attrs.actionCloseEnd);
          }
        });
      },
  
      write: function(attrs, action){
        _this = this.obj;
        if(typeof attrs.modalFooter == "undefined") attrs.modalFooter = {};
        if(typeof attrs.modalFooter.show == "undefined") attrs.modalFooter.show = false;
        if(typeof attrs.modalFooter.buttons == "undefined") attrs.modalFooter.buttons = {};
  
        $(this.obj + " .modal-content").html(attrs.content).animate({scrollTop: 0});
  
        if(($(this.obj + " .modal-content").find(".materialboxed")).length > 0) $('.materialboxed').materialbox();
  
        if(attrs.modalFooter.show){
  
          $(this.obj).append(`<div class="modal-footer">`);
            $.each(attrs.modalFooter.buttons, function(i, v){
              $(_this+" .modal-footer").append(`<a href="javascript:;" class="waves-effect btn-flat ${v.classes}" onclick="${v.action}">${v.text}</a>`);
            });
  
          $(this.obj).append("</div>");
        }
  
        if(typeof action != "undefined") $(this.obj).modal(action);
      },
  
      close: function(attrs){
        if(typeof attrs == "undefined") attrs = {};
        if(typeof attrs.obj == "undefined") attrs.obj = this.obj; else attrs.obj = "#"+attrs.obj;
  
  
        $(attrs.obj).modal("close");
        components.modal.erase();
        eval(attrs.commands);
      },
  
      erase: function(modal){
        $(modal).remove();
      }
    },
  
    sidenav: {
      init: function(attrs){
        $(".sidenav").sidenav({
          onOpenStart: function(){
            _ROUTE_.push("sidenav");
  
            $("main").animate({
              marginLeft: "+=300px"
            }, 250);
  
            $("#sidenav-mobile").find("li.wow").addClass("animated").css("animation-name", "fadeInLeft");
  
            //new WOW().init();
          },
  
          onCloseStart: function(){
            _ROUTE_ = _ROUTE_.filter(e => e !== 'sidenav');
  
            $("main").animate({
              marginLeft: "-=300px"
            }, 100);
  
            $("#sidenav-mobile").find("li.wow").css("animation-name", "none");
          }
        });
  
        $(".sidenav-biblia-livros").sidenav({
          draggable: false,
          onOpenStart: function(){ _ROUTE_.push("sidenav"); },
          onCloseStart: function(){ _ROUTE_ = _ROUTE_.filter(e => e !== 'sidenav'); $(btnCleanSearch).click(); }
        });
  
        $(".sidenav-biblia-capitulos").sidenav({
          draggable: false,
          edge: "right",
          onOpenStart: function(){ _ROUTE_.push("sidenav"); },
          onCloseStart: function(){ _ROUTE_ = _ROUTE_.filter(e => e !== 'sidenav'); }
        });
      }
    },
  
    materialbox: {
      init: function(attrs){
        
        if(typeof attrs == "undefined") attrs = {};
        attrs.onOpenStart = (typeof attrs.onOpenStart == "undefined") ? function() { _ROUTE_.push("imageOpened")} : attrs.onOpenStart; 
        attrs.onCloseStart = (typeof attrs.onCloseStart == "undefined") ? function(){ _ROUTE_ = _ROUTE_.filter(e => e !== 'imageOpened'); } : attrs.onCloseStart;
        attrs.onCloseEnd = (typeof attrs.onCloseEnd == "undefined") ? null : attrs.onCloseEnd;
  
        $('.materialboxed').materialbox({
          onOpenStart: attrs.onOpenStart,
          onCloseStart:  attrs.onCloseStart,
          onCloseEnd: attrs.onCloseEnd
        });
        
      }
    },
  
    uppercaseInput: function(_this){
      var start = _this.selectionStart;
      var end = _this.selectionEnd;
      _this.value = _this.value.toUpperCase();
      _this.setSelectionRange(start, end);
    },
  
    img: function(attrs){
      if(typeof attrs == "undefined") attrs = {};
  
      return ` <div class="img">
            <div class="img-loading">${components.Progress2({preloader: { style: "height: 120px;" }})}</div>
            <img src="${attrs.src}" class="${attrs.classes ? attrs.classes : ''} hide" onerror="$(this).hide();$($(this).parents('.img').find('.img-loading')[0]).hide();" onload="$(this).parents('.img').find('.img-loading')[0].remove(); $(this).removeClass('hide');" style="${attrs.style ? attrs.style : ''}">
          </div>
        `;
    }
  };