
function createContentContainer(headingID, headingInnerText, subHeadingID, subHeadingInnerText) {
    var contentContainer = $("<div class='col-12'></div>");
    var h1String = "<h3 class='col-10 content-margin h1-font-size' id='" + headingID + "'><b>" + headingInnerText + "</b></h3>";
    var h2String = "<h6 class='col-10 content-margin h2-font-size' id='" + subHeadingID + "'>" + subHeadingInnerText + "</h6>"
    var heading1 = $(h1String);
    var heading2 = $(h2String);
    contentContainer.append(heading1);
    contentContainer.append(heading2);
    return contentContainer;
}