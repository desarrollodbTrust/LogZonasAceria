sap.ui.jsview("LogZonasAceria.LogZonasAceria.view.View1", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.View1
	 */
	getControllerName: function () {
		return "LogZonasAceria.LogZonasAceria.controller.View1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf controller.View1
	 */
	createContent: function (oController) {
		
		
		var tabla=new sap.ui.table.Table({
				id:"tablaLogAceria",
				visibleRowCount: 19,
				selectionMode:"None",
			
				footer: new sap.m.Button("idExcel", {
				text: "Exportar a Excel",
				enabled: true,
				press: function (oEvent) {
					// alert("Cambio");
					oController.exportExcel(oEvent);
					// oController.oDataExport(oEvent);
				}

			}),
		});
		var datePicker=new sap.m.DateRangeSelection({
			id:"datePicker",
			width:"30%"
		});
		var boton=new sap.m.Button({
			type:"Emphasized",
			width:"20%",
			text:"Filtrar",
			press:function(oEvent){
				oController.filtrarPorFecha(oEvent);
			}
		});
		var title=new sap.m.Title({
			text:"Registro zonas",
			width:"15%"
		});
		
		var opciones=new sap.m.RadioButtonGroup({
			id:"opciones",
			        columns: 3, // Display in 3 columns
            buttons: [
            	new sap.m.RadioButton({ text: "Todos" , selected:true}),
                new sap.m.RadioButton({ text: "Alertado" }),
                new sap.m.RadioButton({ text: "No Alertado" })
             
            ]
		});
	


			var toolBar=new sap.m.OverflowToolbar({
				content:[
					title,
					opciones,
					datePicker,
					boton
					]
			});
			
			
			
			tabla.setToolbar(toolBar) ;
			var	oControl = new sap.ui.core.Icon({
					src:"sap-icon://circle-task-2",
					color: {
				parts: ['ALERTED_FLAG'],
				formatter: function (valor) {
					var color;
				        if(valor == 1){
				        	color="#ea4335";
				        }
				        else{
				        	color="#34a853";
				        }
    				 return color;

				}
			}
				
				});
		
		tabla.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "St"
			}),
			template: oControl,
			visible: true,
			width:"2%",
			sortProperty: "ALERTED_FLAG"
			
		}));	
		
			var oControl = new sap.ui.commons.TextView({
			text: "{LIC_PLATE}"
		});
		tabla.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "LIC PLATE"
			}),
			template: oControl,
			visible: true,
			width: "8%",
			sortProperty: "LIC_PLATE",
			filterProperty:"LIC_PLATE"
		}));
		
			var oControl = new sap.ui.commons.TextView({
			text: "{path: 'DATE_IN', type: 'sap.ui.model.type.Date', formatOptions: { pattern: 'dd/MM/yyyy HH:mm:ss' } }"
		});
		tabla.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DATE IN"
			}),
			template: oControl,
			visible: true,
			width: "14%",
			filterProperty:"DATE_IN",
			sortProperty: "DATE_IN"
		}));
		
			var oControl = new sap.ui.commons.TextView({
			text: "{path: 'DATE_OUT', type: 'sap.ui.model.type.Date', formatOptions: { pattern: 'dd/MM/yyyy HH:mm:ss' } }"
		});
		tabla.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DATE OUT"
			}),
			template: oControl,
			visible: true,
			width: "14%",
			sortProperty: "DATE_OUT"
		}));
		
				var oControl = new sap.ui.commons.TextView({
			text: "{FENCE_DESCRIPTION}"
		});
		tabla.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "ZONA"
			}),
			template: oControl,
			visible: true,
			width: "16%",
			filterProperty:"FENCE_DESCRIPTION",
			sortProperty: "FENCE_DESCRIPTION"
		}));
		
					var oControl = new sap.ui.commons.TextView({
			text: "{ZONE_TYPE}"
		});
		tabla.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Tipo de Zona"
			}),
			template: oControl,
			visible: true,
			width: "12%",
			filterProperty:"ZONE_TYPE",
			sortProperty: "ZONE_TYPE"
		}));
		
		
	
						var oControl = new sap.ui.commons.TextView({
			text: "{TIMES_ALERTED}"
		});
		tabla.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Alertas"
			}),
			template: oControl,
			visible: true,
			width: "12%",
			sortProperty: "TIMES_ALERTED"
		}));
		
						var oControl = new sap.ui.commons.TextView({
			text: "{DURATION_MINUTES} min"
		});
		tabla.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Tiempo"
			}),
			template: oControl,
			visible: true,
			width: "12%",
			sortProperty: "DURATION_MINUTES"
		}));
		
							var oControl = new sap.ui.commons.TextView({
			text: "{STATUS}"
		});
		tabla.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Status"
			}),
			template: oControl,
			visible: true,
			width: "12%",
			filterProperty:"STATUS",
			sortProperty: "STATUS"
		}));
		
		var oPage = new sap.m.Page({
			showHeader:false,
			id: "page",
			content: [tabla]
		});
		
		


		var app = new sap.m.App(this.createId("app"), {
			initialPage: "oPage",
			
		});
		app.addPage(oPage);
		
		return app;
	}

});