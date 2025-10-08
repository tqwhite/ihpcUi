import Component from "can/component/";
import Map from "can/map/";
import "can/map/define/";
import "./help.less!";
import template from "./help.stache!";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: "This is the help component"
    }
  },
  showContents: function(itemName) {
  	// The location of these files is specified in the API instanceSpecific config file under the key htmlFilePath
    const videoString=`<video style='height:65vh;' controls='true' autoplay='true' src='/api/training/${itemName}'/>`;
    $(`#videoContainer`).html(videoString);

  },
  startVideoEventMonitoring: function() {

    setTimeout(
      () => {
        $(window).one("app.setNewPage", () => {
          this.stopKeepAlive();
        });
        $("video").on("playing", () => {
          this.startKeepAlive();
        }).on("abort", () => {
          this.stopKeepAlive();
        }).on("ended", () => {
          this.stopKeepAlive();
        }).on("pause", () => {
          this.stopKeepAlive();
        });
      },
      100
    ); //let the dom catch up before applying event binding
  },
  startKeepAlive: function() {
    this.attr("%root").renewSession();
    const interval = this.attr("%root").attr("sessionInterval");
    this.currentTimeoutId = setInterval(
      () => {
        this.attr("%root").renewSession();
      },
      interval * 0.8
    );
  },
  stopKeepAlive: function() {
    clearInterval(this.currentTimeoutId);
    this.currentTimeoutId = "";
  }
});

export default Component.extend({
  tag: "help",
  viewModel: ViewModel,
  template
});
