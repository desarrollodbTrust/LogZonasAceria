var user;

var data_tabla;
var fnExcelReport = function (propSave, midata) {
	var a = document.createElement("a");
	//getting data from our div that contains the HTML table
	var tabText = "<table border='2px'><tr style='font-weight: bold;'>";
	var j = 0;

	for (j = 0; j < midata.Header.length; j++) {
		tabText += "<td>" + midata.Header[j] + "</td>";
	}
	tabText += "</tr>";
	tabText += "<tr>";
	for (j = 0; j < midata.data.length; j++) {
		for (var prop in midata.data[j]) {
			tabText += "<td>" + (midata.data[j][prop] || "") + "</td>";
		}
		tabText += "</tr>";
	}

	tabText += "</table>";
	tabText = tabText.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
	tabText = tabText.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
	tabText = tabText.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

	var dataType = "data:application/vnd.ms-excel";
	a.href = dataType + ", " + encodeURIComponent(tabText);
	a.download = propSave + ".xls";
	a.click();
}; 


sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/GroupHeaderListItem",
	"sap/ui/Device",
], function (Controller,JSONModel, History, Filter, FilterOperator, GroupHeaderListItem, Device) {
	"use strict";

	return Controller.extend("LogZonasAceria.LogZonasAceria.controller.View1", {
		onInit: function () {
			var that=this;
			
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData("/services/userapi/currentUser");
			oModel.attachRequestCompleted(function onCompleted(oEvent) {
					var a = this.getJSON();
					var userEmail = JSON.parse(a).email ? JSON.parse(a).email.toString().toUpperCase() : "";
					user=JSON.parse(a).name
					
					if(!userEmail){
						userEmail="ENZO.LEON@DBTRUST.COM.AR";
					}
					var datas = {
						"userid": JSON.parse(a).name,
						"email": userEmail
					};
					
					var datas = {
    						"userid":  JSON.parse(a).name,
    						"email": userEmail
    					};
    					
    					that.generarTabla(user);
			})
		
			
		},
		
		
		
		
		generarTabla:function(user){
			var tablaLogAceria=sap.ui.getCore().byId("tablaLogAceria");
					var sort1 = new sap.ui.model.Sorter("DATE_IN", true);
	tablaLogAceria.getModel().setSizeLimit(200000);
		tablaLogAceria.bindRows("/GEO_FENCE_ALERT_Params(USER_FILTER='"+user+"')/Execute", sort1);
			tablaLogAceria.getModel().setSizeLimit(200000);
		
		},
		
		filtrarPorFecha:function(evento){
			var aFilterss=[];
				var tablaLog=sap.ui.getCore().byId("tablaLogAceria");
			
			//////busco filtros ya puestos/////
			  var oBinding = tablaLog.getBinding("rows");

            if (oBinding) {
                // Get the applied filters
                var aAppliedFilters = oBinding.aFilters || [];
            }
			/////Filtro por fecha/////////////
			var selector=sap.ui.getCore().byId("datePicker");
		var fechaInicio=selector.getDateValue()
		var fechaFin=selector.getSecondDateValue();
	
		if(fechaInicio && fechaFin){
		  var filtroFecha= new sap.ui.model.Filter("DATE_IN",sap.ui.model.FilterOperator.BT,fechaInicio,fechaFin);
		  aFilterss.push(filtroFecha);
		}
		
		
		
		
		
		////Filtro por alaterado o no /////////////////////////////////////
		var opciones=sap.ui.getCore().byId("opciones");
		var elegido;
		var seleccion=opciones.getSelectedButton().getText();
		switch(seleccion) {
  case "Alertado":
       elegido=1;
    break;
  case "No Alertado":
    elegido=0;
    break;
    
    case "Todos":
    elegido=2;
    break;

}
console.log(elegido)
		
		if (elegido==1 || elegido == 0){
				var filtroOpciones=new sap.ui.model.Filter("ALERTED_FLAG",sap.ui.model.FilterOperator.EQ,elegido)
				aFilterss.push(filtroOpciones);
				
		}
	var filtrosCombinados=aFilterss.concat(aAppliedFilters)
tablaLog.getBinding("rows").filter(filtrosCombinados);
		
		},
		
				exportExcel: function (event) {
						var tabla=sap.ui.getCore().byId("tablaLogAceria");
						tabla.getModel().setSizeLimit(30000000);
				var arrMaster = tabla.getBinding("rows").getContexts();
				console.log(arrMaster);
				var total = tabla.getBinding().getLength();
				console.log("TOTAL" + total);
				var totalArreglo = arrMaster.length;
				if (total !== totalArreglo) {
					return;
				}
				data_tabla = arrMaster;	
					
					
			
			
			var midata = [];
			data_tabla.map(function (item) {
				midata.push({
					ALERTED:item.getObject().ALERTED_FLAG ? "Alertado" : "No Alertado",
					LIC_PLATE: item.getObject().LIC_PLATE,
					DATE_IN: item.getObject().DATE_IN,
					DATE_OUT:item.getObject().DATE_OUT,
					ZONA:item.getObject().FENCE_DESCRIPTION,
					TIPO_ZONA: item.getObject().ZONE_TYPE,
					CANT_ALERTAS:item.getObject().TIMES_ALERTED,
					DURATION: (item.getObject().DURATION_MINUTES || 0) + " Min",
				ESTADO: item.getObject().STATUS
				});
			});

			fnExcelReport("ReporteAceria", {
				Header: ["Alertado","Patente", "Fecha ingreso", "Fecha Salida", "Zona", "Tipo Zona", "Cant Alertas", "Duracion", "Estado"],
				data: midata
			});
		},
	});
});