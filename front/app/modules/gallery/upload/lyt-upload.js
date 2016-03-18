define(['jquery','underscore','backbone','marionette','config','dropzone'],
  function($, _, Backbone, Marionette, config, Dropzone) {
  'use strict';

  return Marionette.LayoutView.extend({
  	template: 'app/modules/gallery/upload/tpl-upload.html',
    className: 'file-uploader',
    uploader: null,
    options: {},

    successMessage: 'File uploaded successfully',

    ui: {
      previews : '#previews'
    },


  	initialize: function() {
  		this.model = new Backbone.Model();
  		this.model.set('title', 'Photo Form Upload');
  	},

		onShow: function(){
      var _this = this;

        var previewTemplate = this.ui.previews.html();
        this.ui.previews.html('');

        this.myDropzone = new Dropzone(this.el, {
          url: config.proxy+'gallery/upload',
          thumbnailWidth: 80,
          thumbnailHeight: 80,
          parallelUploads: 1,
          previewTemplate: previewTemplate,
          autoQueue: false,
          previewsContainer: '#previews',
          clickable: '.fileinput-button'
        });

        console.log(document);
        console.log(window);
        this.myDropzone.on('addedfile', function(file) {
          // Hookup the start button
          file.previewElement.querySelector('.start').onclick = function() { _this.myDropzone.enqueueFile(file); };
        });

        // Update the total progress bar
        this.myDropzone.on('totaluploadprogress', function(progress) {
          document.querySelector('#total-progress .progress-bar').style.width = progress + '%';
        });

        this.myDropzone.on('sending', function(file) {
          // Show the total progress bar when upload starts
          document.querySelector('#total-progress').style.opacity = '1';
          // And disable the start button
          file.previewElement.querySelector('.start').setAttribute('disabled', 'disabled');
        });

        // Hide the total progress bar when nothing's uploading anymore
        this.myDropzone.on('queuecomplete', function(progress) {
          document.querySelector('#total-progress').style.opacity = '0';
        });

        // Setup the buttons for all transfers
        // The 'add files' button doesn't need to be setup because the config
        // `clickable` has already been specified.
        document.querySelector('#actions .start').onclick = function() {
          this.myDropzone.enqueueFiles(_this.myDropzone.getFilesWithStatus(Dropzone.ADDED));
        };
        document.querySelector('#actions .cancel').onclick = function() {
          this.myDropzone.removeAllFiles(true);
        };

			},
		});
});