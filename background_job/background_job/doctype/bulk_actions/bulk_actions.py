# Copyright (c) 2022, smb and contributors
# For license information, please see license.txt

import frappe
import json
from frappe import _, msgprint
from frappe.model.document import Document

class BulkActions(Document):
	def on_submit(self):
		if self.status == "Draft":
			for si in self.invoices:
				doc = frappe.get_doc('Sales Invoice', si.sales_invoice)
				doc.save()
				doc.submit()
		elif self.status ==	"Submitted":
			for si in self.invoices:
				doc = frappe.get_doc('Sales Invoice', si.sales_invoice)
				doc.save()
				doc.cancel()
				frappe.db.commit()

	def submit(self):
		if len(self.invoices) > 0:
			msgprint(_("The task has been enqueued as a background job. In case there is any issue on processing in background, the system will add a comment about the error on this Bulk Actions Record and revert to the Draft stage"))
			self.queue_action('submit', timeout=20000)
		else:
			self._submit()

