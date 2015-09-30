this["JST"] = this["JST"] || {};

this["JST"]["app/base/header/tpl-header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<nav class="navbar">\r\n\t<div class="container-fluid">\r\n\t\t<div class="navbar-header">\r\n\t\t\t<a class="navbar-brand after ripplelink" href="#">\r\n\t\t\t\tHome\r\n\t\t\t</a>\r\n\t\t\t<ul class="nav navbar-nav">\r\n\t\t\t    <li>\r\n\t\t\t        <a href="#gallery">Gallery</a>\r\n\t\t\t    </li>\r\n\t\t\t    <li>\r\n\t\t\t        <a href="#about">About</a>\r\n\t\t\t    </li>\r\n\t\t\t    <li>\r\n\t\t\t        <a href="#contact">Contact</a>\r\n\t\t\t    </li>\r\n\t\t\t</ul>\r\n\t\t</div>\r\n\t\t<ul class="nav navbar-nav navbar-right">\r\n\r\n\t\t\t<li id="header-loader" class="hidden">\r\n\t\t\t\t<a>\r\n\t\t\t\t\t<svg width="50" height="10">\r\n\t\t\t\t\t\t<rect x="0" y="0" rx="3" ry="3" width="10" height="10">\r\n\t\t\t\t\t\t\t<animate attributeName="width" values="0;10;10;10;0" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t\t<animate attributeName="height" values="0;10;10;10;0" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t\t<animate attributeName="x" values="5;0;0;0;5" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t\t<animate attributeName="y" values="5;0;0;0;5" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t</rect>\r\n\t\t\t\t\t\t<rect x="15" y="0" rx="3" ry="3" width="10" height="10">\r\n\t\t\t\t\t\t\t<animate attributeName="width" values="0;10;10;10;0" begin="200ms" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t\t<animate attributeName="height" values="0;10;10;10;0" begin="200ms" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t\t<animate attributeName="x" values="20;15;15;15;20" begin="200ms" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t\t<animate attributeName="y" values="5;0;0;0;5" begin="200ms" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t</rect>\r\n\t\t\t\t\t\t<rect x="30.6084" y="0.608427" rx="3" ry="3" width="8.78315" height="8.78315">\r\n\t\t\t\t\t\t<animate attributeName="width" values="0;10;10;10;0" begin="400ms" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t<animate attributeName="height" values="0;10;10;10;0" begin="400ms" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t<animate attributeName="x" values="35;30;30;30;35" begin="400ms" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t<animate attributeName="y" values="5;0;0;0;5" begin="400ms" dur="1000ms" repeatCount="indefinite"></animate>\r\n\t\t\t\t\t\t</rect>\r\n\t\t\t\t\t</svg>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t\t<li>\r\n\t\t\t</li>\r\n\t\t\t<li>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n</nav>';

}
return __p
};

this["JST"]["app/base/home/tpl/tpl-home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n\t<h1 class="text-center">iFeedBird</h1>\r\n\t<div class="logo center-block"></div>\r\n\t<br>\r\n\t<button id="startCapture" class="btn btn-success btn-lg btn-block">Start Capture</button>\r\n</div>\r\n';

}
return __p
};

this["JST"]["app/base/rootview/tpl-rootview.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header class="clearfix">\r\n</header>\r\n<main role="main" id="main" class="clearfix ">\r\n</main>\r\n<footer>\r\n\t<div class="col-lg-12">\r\n\t    <p>Copyright © <a href="http://natural-solutions.eu">natural-solutions.eu</a></p>\r\n\t    <p>\r\n\t        <img src="../static/images/nslogo.png" alt="">\r\n\t    </p>\r\n\t</div>\r\n</footer>\r\n';

}
return __p
};

this["JST"]["app/modules/about/tpl-about.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n    <h1 class="text-center">About</h1>\r\n    <div class="logo center-block"></div>\r\n    <br>\r\n    <div class="row" >\r\n        <p>iFeedBird est un projet basé sur Raspberry Pi, qui permet de prendre en photo les oiseaux s\'approchant d\'une mangeoire\r\n            et de reconnaitre l\'espèce.</p>\r\n        <p>Il utilise les composants suivants :\r\n        <ul>\r\n            <li>Raspberry Pi A+</li>\r\n            <li>Capteur infrarouge</li>\r\n            <li>Capteur ultrason</li>\r\n            <li>Appareil photo PiCamera</li>\r\n            <li>...</li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["app/modules/contact/tpl-contact.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n\t<h1 class="text-center">Contact</h1>\r\n\t<div class="logo center-block"></div>\r\n\t<br>\r\n    <div class="form" >\r\n        <form method="post" action="{{ url_for(\'contact\') }}">\r\n            <input name="action" value="submit" type="hidden">\r\n            Nom :\r\n            <br>\r\n            <input type="text" value="" placeholder="Inactive" name="name" class="form-control" size="30">\r\n            Adresse :\r\n            <br>\r\n            <input type="text" value="" placeholder="Inactive" name="email" class="form-control" size="30">\r\n            Message :\r\n            <br>\r\n            <textarea name="message" placeholder="Inactive" rows="5" class="form-control"></textarea><br>\r\n            <input class="btn btn-block btn-lg btn-primary" value="Envoyer" type="submit">\r\n        </form>\r\n    </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["app/modules/details/tpl-details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="detailsMainRegion" style="border:1px solid #C0C0C0;color:#404040;padding:0 10px 10px 20px;margin:10px 0;border-radius:10px;background-color: rgba(240, 240, 240, 1);">\r\n    <h3 class="text-center">Informations sur la photo</h3>\r\n    <h5>Nom du fichier : ' +
((__t = ( name )) == null ? '' : __t) +
'</h5>\r\n    <h5>Date : ' +
((__t = ( date )) == null ? '' : __t) +
'</h5>\r\n    <h5>Espèce détectée : </h5>\r\n    <div class="">\r\n        <a href="' +
((__t = ( path )) == null ? '' : __t) +
'"><img class="" src="' +
((__t = ( path )) == null ? '' : __t) +
'" alt="Photo" height="100%" width="100%"/></a><br>\r\n    </div>\r\n    \r\n        <input name="action" value="submit" type="hidden">\r\n        <br>\r\n        Nom de la photo :\r\n        <br>\r\n        <input id = "name" type="text" value="' +
((__t = ( name )) == null ? '' : __t) +
'" placeholder="Saisir un nouveau nom" name="name" class="form-control" size="30">\r\n        Commentaire :\r\n        <br>\r\n        <textarea id="comment" type="text" value="' +
((__t = ( comment )) == null ? '' : __t) +
'" name="comment" placeholder="Saisir un commentaire" rows="5" class="form-control"></textarea><br>\r\n        <button id ="btn-save" class="btn btn-block btn-lg btn-primary" value="Sauvegarder" type="submit">Sauvegarder</button>\r\n</div>\r\n\r\n<!--\r\n    <form method="post" action="{{ url_for(\'editPhoto\') }}">\r\n        Editer le nom : <br>\r\n        <input type="text" value="" placeholder="Saisir un nouveau nom" name="name" class="form-control" size="40">\r\n        Ajouter un commentaire : <br>\r\n        <textarea name="message" placeholder="Saisir un commentaire" rows="5" class="form-control"></textarea><br>\r\n        <input class="btn btn-block btn-lg btn-primary" value="Sauvegarder" type="submit">\r\n    </form>\r\n\r\n{{ url_for(\'details_photo\') }}\r\n-->\r\n';

}
return __p
};

this["JST"]["app/modules/focus/tpl-focus.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n\t<div class="header-focus">\r\n\t    <h1 class="text-center">Détails de la photo</h1>\r\n\t    <a href="#gallery">\r\n\t    \t<h4 class="text-center">Retour à la gallerie</h4>\r\n\t    </a>\r\n\t</div>\r\n\t<div class="main-focus">\r\n\t    <div id="details" class="col-lg-6 col-md-6 details">\r\n\t        \r\n\t    </div>\r\n\t    <div id="species" class="col-lg-6 col-md-6 species">\r\n\t        \r\n\t    </div>\r\n\t</div>\r\n</div>';

}
return __p
};

this["JST"]["app/modules/gallery/frame/tpl-frame.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n    <div id="framephoto">\r\n    </div>\r\n    <div id="photoframe" class="col-md-3 col-sm-4 portfolio-item">\r\n        <div class="div-images">\r\n            <div class="intro-photo">\r\n                <h5>Nom : ' +
((__t = ( ID )) == null ? '' : __t) +
'</h5>\r\n                <h5>Date et heure : ' +
((__t = ( date )) == null ? '' : __t) +
'</h5>\r\n            </div>\r\n            <div class="images">\r\n                <a href="' +
((__t = ( path )) == null ? '' : __t) +
'"><img class="img-rounded img-responsive view-details" src="' +
((__t = ( resized )) == null ? '' : __t) +
'" alt="Photo"/></a>\r\n            </div>\r\n            <div class="action_delete">\r\n                <button data-id="' +
((__t = ( ID )) == null ? '' : __t) +
'" class="btn btn-block btn-lg btn-warning btnDelete" id="btnDelete">Delete</button>\r\n            </div>\r\n            <a href="#details/' +
((__t = ( ID )) == null ? '' : __t) +
'" class="btn btn-block btn-lg btn-default">Détails</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["app/modules/gallery/tpl-gallery.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n    <h1 class="text-center">Picture gallery</h1>\r\n    <div class="logo center-block"></div>\r\n    <br>\r\n    \r\n    <div id="photoList"></div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["app/modules/species/tpl-species.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="speciesMainRegion" style="border:1px solid #C0C0C0;color:#404040;padding:0 10px 10px 20px;margin:10px 0;border-radius:10px;box-shadow:3px 3px 6px 0 #A9A9A9;background-color: rgba(240, 240, 240, 1);">\r\n\t<h3 class="text-center">Information sur l\'espèce détectée</h3>\r\n\t<div class="species-generalities">\r\n\t\t<h4>Généralités</h4>\r\n\t\t<h5>Nom français : ' +
((__t = ( name_fr )) == null ? '' : __t) +
'</h5>\r\n\t\t<h5>Nom anglais : ' +
((__t = ( name_en )) == null ? '' : __t) +
'</h5>\r\n\t\t<h5>Nom latin : ' +
((__t = ( name_la )) == null ? '' : __t) +
'</h5>\r\n\t\t<h5>Authority : ' +
((__t = ( authority )) == null ? '' : __t) +
'</h5>\r\n\t\t<h5>Occurence : ' +
((__t = ( frequency )) == null ? '' : __t) +
'</h5>\r\n\t</div>\r\n\t<br>\r\n\t<div class="species-pictures-gallery">\r\n\t\t<div class="species-picture-1 col-md-6"><img class="img-rounded img-responsive" src="" alt="picture1"/></div>\r\n\t\t<div class="species-picture-2 col-md-6"><img class="img-rounded img-responsive" src="" alt="picture2"/></div>\r\n\t\t<br>\r\n\t</div>\r\n\t<div class="species-biometrics">\r\n\t\t<h4>Biométrie</h4>\r\n\t</div>\r\n\t<div class="species-size">\r\n\t\t<h5>Taille (cm) : ' +
((__t = ( length )) == null ? '' : __t) +
'</h5>\r\n\t</div>\r\n\t<div class="species-wingspan">\r\n\t\t<h5>Envergure (cm) : ' +
((__t = ( wingspan )) == null ? '' : __t) +
'</h5>\r\n\t</div>\r\n\t<div class="species-weight">\r\n\t\t<h5>Poids (g) : ' +
((__t = ( weight )) == null ? '' : __t) +
'</h5>\r\n\t</div>\r\n\t<div class="red-list-category">\r\n\t\t<h4>Statut de protection : ' +
((__t = ( red_list_category )) == null ? '' : __t) +
'</h4>\r\n\t</div>\r\n\t<div class="species-description" align="justify">\r\n\t\t<h4>Description</h4>\r\n\t\t<h5>' +
((__t = ( description )) == null ? '' : __t) +
'</h5>\r\n\t</div>\r\n\t<div class="">\r\n\t\t<h4>Répartition géographique : </h4>\r\n\t</div>\r\n\t<div class="">\r\n\t\t<img class="img-rounded img-responsive" src="' +
((__t = ( distribution )) == null ? '' : __t) +
'" alt="map"/>\r\n\t</div>\r\n</div>\r\n';

}
return __p
};