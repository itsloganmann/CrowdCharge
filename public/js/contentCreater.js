
function createContentContainer(containerID, headingID, headingInnerText, subHeadingID, subHeadingInnerText) {
    var contentContainer = $("<div id='" + containerID + "' class='tab-section-content col-12'>");
    var h1String = "<h3 class='col-11 inner-header' id='" + headingID + "'><b>" + headingInnerText + "</b></h3>";
    var h2String = "<h6 class='col-11 inner-subheader' id='" + subHeadingID + "'>" + subHeadingInnerText + "</h6>"
    var heading1 = $(h1String);
    var heading2 = $(h2String);
    contentContainer.append(heading1);
    contentContainer.append(heading2);
    return contentContainer;
}