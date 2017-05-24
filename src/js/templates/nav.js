import Handlebars from "handlebars";export default Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<a class=\"nav-elem\">\n			<h4 class=\"nav-title\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h4>\n		</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"nav-bar\" class=\"hide\">\n	<a id=\"nav-left\" class=\"nav-arrow\">\n		<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 32\"><title>left</title><path class=\"i\" d=\"M11.3,16.7l9,9a1,1,0,0,0,1.4-1.4L13.4,16l8.3-8.3a1,1,0,1,0-1.4-1.4l-9,9A1,1,0,0,0,11.3,16.7Z\"/></svg>\n	</a>\n	<div id=\"nav-container\">\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\n	<a id=\"nav-right\" class=\"nav-arrow\">\n		<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 32\"><title>right</title><path class=\"i\" d=\"M21.7,15.3l-9-9a1,1,0,0,0-1.4,1.4L19.6,16l-8.3,8.3a1,1,0,0,0,1.4,1.4l9-9A1,1,0,0,0,21.7,15.3Z\"/></svg>\n	</a>\n</div>";
},"useData":true});