var app = {
  initialize: function () {
    _ROUTE_ = [];
    $("main").html("");
    app.pageMain();
  },

  pageMain: function () {
    app.pageHome.page();
  },

  openPage: function (attrs, page) {
    if (!attrs.isBack) _ROUTE_.push(attrs.back);

    if (_ROUTE_.slice(-1) == "main") $("main").prepend(page);
    else {
      var pages = $("main").find(" > div");

      $("main").prepend(
        $(page).css({
          "margin-left": "100%",
          opacity: "1",
          "z-index": 999 + parseInt(pages.length),
        }),
      );

      pages = $("main").find(" > div");

      if ($(pages[pages.length - 1]).css("opacity") > 0) {
        $(pages).each(function (i, v) {
          if (i > 0) {
            $(v).animate(
              {
                marginLeft: "-10%",
                opacity: attrs.transparent ? 0 : 1,
              },
              100,
            );
          }
        });
      }

      $(pages[0]).animate(
        {
          marginLeft: "0%",
          opacity: 1,
        },
        {
          easing: "swing",
          duration: 250,
          complete: function () {
            $(".navbar-fixed").css("left", "0px");
          },
        },
      );
    }
  },

  closePage: function () {
    var pages = $("main").find(" > div");

    if (pages.length > 1) {
      if ($(pages[pages.length - 1]).css("opacity") == 0)
        elem = pages[pages.length - (pages.length - 1)];
      else elem = pages;

      $(elem).animate(
        {
          marginLeft: "0px",
          opacity: 1,
          complete: function () {
            $(elem).css("left", "0px");
          },
        },
        100,
      ); //main

      $(pages[0]).animate(
        {
          marginLeft: "100%",
          opacity: 1,
        },
        {
          easing: "swing",
          duration: 100,
          complete: function () {
            $(pages[0]).remove();
            _ROUTE_.pop();
          },
        },
      ); //new

      /*$($("main").find(" > div")[0]).fadeOut("slow",
        function(){
          $(this).remove();
          _ROUTE_.pop();
        }
      );*/
    }
  },

  pageHome: {
    page: function (attrs) {
      if (typeof attrs == "undefined") attrs = {};
      if (typeof attrs.transition == "undefined") attrs.transition = "fadeIn";
      if (typeof attrs.title == "undefined") attrs.title = "";

      if (typeof attrs.isBack == "undefined") attrs.isBack = false;
      if (attrs.isBack) _ROUTE_.pop();

      app.openPage({back: "main", isBack: attrs.isBack},
        `<div class="indigo white-text vh100">
          
          <div class="fixed z-index">${components.navBarFixed.default({classes: "z-depth-0 p10 indigo"})}</div>

          <div id="tabHome" class="page wow fadeInLeft" data-wow-duration="300ms" style="padding-top: 56px;">
            ${this.tabHome.page()}
          </div>

          <div id="tabList" class="page wow fadeInRight" data-wow-duration="300ms" style="padding-top: 56px;"></div>

          <div class="row" style="bottom: 0px; position: absolute; width: 100%; z-index:5; margin-bottom: 0px;">
            <ul id="tabsMain" class="tabs white h100 rounded-20 z-depth-3" style="bottom: 5px; transform: scale(0.95)">

              <li class="tab col s4" style="height: 70px !important; line-height: 17px !important;">
                <a href="#tabHome" class="p0 active indigo-text">
                  <p>
                    <i class="anticon icon-home fs24"></i><br/>
                    <span class="fs12 black-text">Início</span>
                  </p>
                </a>
              </li>
              
              <li class="tab col s4" style="height: 70px !important; line-height: 17px !important;">
                <a href="#tabList" class="p0 indigo-text">
                  <p>
                    <i class="anticon icon-heart-o fs24"></i><br/>
                    <span class="fs12 black-text">List</span>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>`
      );

      this.tabList();

      var sTabID = attrs.tab == "undefined" ? "tabHome" : attrs.tab;

      $("#tabsMain")
        .tabs({
          swipeable: false,
          responsiveThreshold: 0,
          //swipeable: true,
          onShow: function () {
            $(this.$activeTabLink[0].hash).scrollTop(0);
          },
        })
        .tabs("select", sTabID);

      setTimeout(function () {
        $(".tabs .indicator").animate({ opacity: 0 }, 200);
      }, 300);

      components.materialbox.init();

      app.functions.bindXPull({
        elem: ".pull",
        callback: function () {
          app.initialize();
        },
      });
    },

    tabHome: {
      page: function () {
        return `<div class="h100">

          <div class="row p15-0 pull">

            <div class="container p5-0 white-text center">

              Bem-vindo<br/>
              <b>App de exemplo</b><br/><br/>

              <a href="javascript:;" class="btn-large red rounded-10" onclick="app.pageInfo.page();">Nova página</a><br/><br/>
              <a href="javascript:;" class="btn-large blue rounded-10" onclick="app.functions.funCheckLastUpdate()">Verificar nova versão</a><br/><br/>

              <center>
                ${components.img({ src: "https://cdn.dribbble.com/users/5031/screenshots/3713646/attachments/832536/wallpaper_mikael_gustafsson.png", classes: "responsive-img materialboxed circle", style: "width: 150px; height: 150px;" })}<br/>
                ${components.img({ src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUt9ajZ-akc2cNJaU4lcxn1zQL59UGAe7aw&s", classes: "responsive-img materialboxed circle", style: "width: 150px; height: 150px;" })}<br/>
                ${components.img({ src: "https://i.redd.it/d2hd73xxwvaa1.jpg", classes: "responsive-img materialboxed circle", style: "width: 150px; height: 150px;" })}
              </center>

              <br/><br/><br/>

            </div>
          </div>
        </div>`;
      },
    },

    tabList: function () {
      let z = 10;
      let sLista = "";

      for (let i = 0; i < z; i++) {
        sLista += `<div class="grey lighten-5 rounded-10" onclick="app.modals.whatsNew.view()" style="padding: 15px 20px; margin-bottom: 10px; display: flex; align-items: center;">
          <div style="padding-right: 15px;"><i class="anticon icon-heart red-text text-darken-1 fs22"></i></div>
          <div class="w85">
            <span class="fs15 bold truncate">Linha ${i}</span>
          </div>
          <div><i class="fa fa-chevron-right grey-text text-darken-1 fs18"></i></div>
        </div>`;
      }

      $("#tabList").html(
        `<div class="row black-text pull">
          <div class="container"><br/>
            <div class="fs14 light">
              ${sLista}
            </div>
          </div>
        </div>`
    );
    },
  },

  pageInfo: {
    page: function (attrs) {
      if (typeof attrs == "undefined") attrs = {};

      if (typeof attrs.transparent == "undefined") attrs.transparent = false;
      if (typeof attrs.isBack == "undefined") attrs.isBack = false;
      if (attrs.isBack) _ROUTE_.pop();

      attrsNavbar = {
        title: "Nova página",
        back: "app.closePage();",
        classes: "red white-text",
      };

      app.openPage({back: attrsNavbar.back, isBack: attrs.isBack, transparent: attrs.transparent},
        `<div class="fixed w100 dvh100 red">
          
          ${components.navBarFixed.back(attrsNavbar)}

          <div id="infos" class="page p10">
            ${components.openInnerLoading({ background: "transparent", distance: 50, color: "white" })}
          </div>
        </div>`,
      );

      this.load();
    },

    load: function(){
      setTimeout(function(){
        $("#infos").html(`
          <div class="center white-text">
            
            <p class="fs14">Esta é uma nova página. Você pode criar quantas páginas quiser, e navegar entre elas usando os botões de ação.</p><br/>

            <a href="javascript:;" class="btn-large black rounded-10" onclick="app.pageInfo.pageOutraPagina.page();">Outra página</a><br/><br/>

          </div>
        `);
      }, 1000);
    },

    pageOutraPagina: {
      page: function (attrs) {
        if (typeof attrs == "undefined") attrs = {};

        if (typeof attrs.isBack == "undefined") attrs.isBack = false;
        if (attrs.isBack) _ROUTE_.pop();

        attrsNavbar = {
          title: "Outra página",
          back: "app.closePage();",
          classes: "indigo white-text",
        };

        app.openPage({ back: attrsNavbar.back, isBack: attrs.isBack },
          `<div class="fixed w100 dvh100 white overflow-scroll">

            ${components.navBarFixed.back(attrsNavbar)}

            <div class="page" id="outra">
              <div class="white black-text center bold">
                <h4>Outra página</h4>
                <p>.</p>
                <p>.</p>
                <p>.</p>
            </div>
          </div>`,
        );

      },
    },
  },

  modals: {
    whatsNew: {
      view: function (attrs) {
        var objModal = "modalWhatsNew";

        components.modal.init({
          obj: objModal,
          classes:
            "grey lighten-5 wow fadeInUp rounded-10 overflow-scroll modal-fullscreen",
          classesContent: "p0-20 flex-vertical-center",
        });

        components.modal.write({
            content:
              `<div class="grey lighten-5">
              <p class="fs32 bold w100 center m0">O que há de novo?</p><br/>

              <div class="row">
                <div class="col s1"></div>
                <div class="col s2 right-align"><i class="fa fa-map-marked-alt green-text fs30 wow bounceIn" data-wow-delay="200ms" style="margin-top: 20px;"></i></div>
                <div class="col s8 wow fadeInRight" data-wow-delay="200ms">
                  <b>Lorem Ipsum</b><br/>
                  <span class="grey-text text-darken-1 fs12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</span>
                </div>
                <div class="col s1"></div>
              </div>

              <div class="row">
                <div class="col s1"></div>
                <div class="col s2 right-align"><i class="fa fa-file-alt blue-text fs30 wow bounceIn" data-wow-delay="500ms" style="margin-top: 20px;"></i></div>
                <div class="col s8 wow fadeInRight" data-wow-delay="500ms">
                  <b>Lorem Ipsum</b><br/>
                  <span class="grey-text text-darken-1 fs12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</span>
                </div>
                <div class="col s1"></div>
              </div>

              <div class="row">
                <div class="col s1"></div>
                <div class="col s2 right-align"><i class="fa fa-star amber-text fs30 wow bounceIn" data-wow-delay="1000ms" style="margin-top: 20px;"></i></div>
                <div class="col s8 wow fadeInRight" data-wow-delay="1000ms">
                  <b>Lorem Ipsum</b><br/>
                  <span class="grey-text text-darken-1 fs12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</span>
                </div>
                <div class="col s1"></div>
              </div>

              <div class="row">
                <div class="col s1"></div>
                <div class="col s2 right-align"><i class="fa fa-hand-holding-heart red-text text-lighten-1 fs30 wow bounceIn" data-wow-delay="1500ms" style="margin-top: 20px;"></i></div>
                <div class="col s8 wow fadeInRight" data-wow-delay="1500ms">
                  <b>Lorem Ipsum</b><br/>
                  <span class="grey-text text-darken-1 fs12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</span>
                </div>
                <div class="col s1"></div>
              </div>

              <br/>

              <center>
                <a href="javascript:;" class="btn z-depth-0 w80 indigo white-text rounded-10 text-transform-none modal-close wow fadeInRight" data-wow-delay="1800ms">Continuar</a>
              </center>

              <p class="fs10 grey-text center-align w100 wow fadeInRight" data-wow-delay="1800ms">v. ${nVersionApp}</p>

            </div>`,
          }, "open",
        );
      },
    },
  },

  functions: {
    funCheckLastUpdate: function () {
      components.Dialog.show({
        type: "dialog",
        backgroundDismiss: true,
        color: "orange",
        onContentReady: function () {
          this.setContent(
            `<div class="row container center" style="margin-left: auto !important; margin-right: auto !important; margin-bottom: 20px !important;"><br/><center><img src="https://www.iparoquiano.com.br/app/v2/church-bell(2).gif" class="responsive-img w40"></center><span class="fs20 bold">Nova versão disponível!</span><br/><span class="grey-text text-darken-2 fs16">Baixe agora a versão mais nova e com muitas novidades do <b>Meu Aplicativo</b></span><br/><br/><a href="${/android/i.test(navigator.userAgent) ? apps.android : apps.ios}" class="col s12 btn-large green white-text rounded-5 z-depth-0" style="margin-bottom:15px;">ATUALIZAR AGORA</a></div>`,
          );
        },
      });
    },

    bindXPull: function (attrs) {
      $(attrs.elem).prepend(`
        <div class="xpull">
          <div class="xpull__start-msg">
            <div class="xpull__start-msg-text fs12 white-text">Solte para atualizar</div>
            <div class="xpull__arrow"></div>
          </div>
          <div class="xpull__spinner">
            <div class="xpull__spinner-circle"></div>
          </div>
        </div>
      `);

      $(attrs.elem).xpull({
        callback: attrs.callback,
      });
    },
  },
};

$(function () {
  app.initialize();
  new WOW().init();

  $(".sidenav").sidenav({
    onOpenStart: function () {
      _ROUTE_.push("sidenav");
    },
    onCloseStart: function () {
      _ROUTE_.pop();
    },
  });

  $('.collapsible').collapsible();
});

window.onload = function () {
  //app.functions.funCheckLastUpdate();
};
