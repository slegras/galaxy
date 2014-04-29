define(["galaxy.masthead","utils/utils","libs/toastr","mvc/base-mvc","mvc/library/library-model","mvc/library/library-folderlist-view","mvc/library/library-librarylist-view","mvc/library/library-librarytoolbar-view","mvc/library/library-foldertoolbar-view"],function(e,c,g,k,h,a,f,d,i){var l=Backbone.Router.extend({routes:{"":"libraries","folders/:id":"folder_content","folders/:folder_id/download/:format":"download"}});var j=k.SessionStorageModel.extend({defaults:{with_deleted:false,sort_order:"asc",sort_by:"name"}});var b=Backbone.View.extend({libraryToolbarView:null,libraryListView:null,library_router:null,folderToolbarView:null,folderListView:null,initialize:function(){Galaxy.libraries=this;this.preferences=new j({id:"global-lib-prefs"});this.library_router=new l();this.library_router.on("route:libraries",function(){Galaxy.libraries.libraryToolbarView=new d.LibraryToolbarView();Galaxy.libraries.libraryListView=new f.LibraryListView()});this.library_router.on("route:folder_content",function(m){if(Galaxy.libraries.folderToolbarView){Galaxy.libraries.folderToolbarView.$el.unbind("click")}Galaxy.libraries.folderToolbarView=new i.FolderToolbarView({id:m});Galaxy.libraries.folderListView=new a.FolderListView({id:m})});this.library_router.on("route:download",function(m,n){if($("#folder_list_body").find(":checked").length===0){g.info("You have to select some datasets to download");Galaxy.libraries.library_router.navigate("folders/"+m,{trigger:true,replace:true})}else{Galaxy.libraries.folderToolbarView.download(m,n);Galaxy.libraries.library_router.navigate("folders/"+m,{trigger:false,replace:true})}});Backbone.history.start({pushState:false})}});return{GalaxyApp:b}});