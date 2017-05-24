import Handlebars from "handlebars";export default Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<div class=\"item-count\">+"
    + container.escapeExpression(((helper = (helper = helpers.count || (depth0 != null ? depth0.count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"count","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "			<figure class=\"photo\">\n				<img class=\"photo-img\" src=\""
    + container.escapeExpression(alias1((depth0 != null ? depth0.src : depth0), depth0))
    + "\"/>\n				<figcaption class=\"photo-title\"> "
    + ((stack1 = alias1((depth0 != null ? depth0.title : depth0), depth0)) != null ? stack1 : "")
    + " </figcaption>\n			</figure>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<article class=\"item\">\n"
    + ((stack1 = helpers["if"].call(depth0,(depth0 != null ? depth0.more : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	<div class=\"item-container\">\n		<div class=\"item-photos\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.photos : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n		<div class=\"item-caption\">\n			<h3 class=\"item-title\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n			<p class=\"item-desc\">"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n		</div>\n	</div>\n</article>";
},"useData":true});