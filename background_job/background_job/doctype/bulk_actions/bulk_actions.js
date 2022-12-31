// Copyright (c) 2022, smb and contributors
// For license information, please see license.txt

frappe.ui.form.on('Bulk Actions', {
	get_invoices: function(frm) {
		if(frm.doc.status == "Draft"){
			frappe.db.get_list('Sales Invoice', {
				filters: [
					['posting_date', 'between', [frm.doc.from_date, frm.doc.to_date]],
					['docstatus', '=', '0']
				],
				fields: ['name'],
				limit: 1000,
				}).then(res => {
					console.log(res)
					if(res.length > 0){
						frm.clear_table("invoices");
						for (let i = 0; i < res.length; i++){
							let si = cur_frm.add_child("invoices");
							si.sales_invoice = res[i].name;
						}
						cur_frm.refresh_field("invoices");
					}
					else{
						frappe.msgprint(__('No Records Exist'));
					}
					
			});
		}
		if(frm.doc.status == "Submitted"){
			frappe.db.get_list('Sales Invoice', {
				filters: [
					['posting_date', 'between', [frm.doc.from_date, frm.doc.to_date]],
					['docstatus', '=', '1']
				],
				fields: ['name'],
				limit: 1000,
				}).then(res => {
					console.log(res)
					if(res.length > 0){
						frm.clear_table("invoices");
						for (let i = 0; i < res.length; i++){
							let si = cur_frm.add_child("invoices");
							si.sales_invoice = res[i].name;
						}
						cur_frm.refresh_field("invoices");
					}
					else{
						frappe.msgprint(__('No Records Exist'));
					}
			});
		}
	}
});
