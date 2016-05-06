<?php
/**
 * Defines the InteriorPage page type
 */

class InteriorPage extends Page {

	private static $db = array(

	);
	private static $has_one = array(

	);
	private static $has_many = array(
		'PhotoEntries' => 'PhotoEntry'
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		// Photo Gallery
		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("PhotoEntries", "Photos:", $this->PhotoEntries(), $gridFieldConfig);
		$fields->addFieldToTab("Root.PhotoGallery", $gridField);

		return $fields;
	}
}

class InteriorPage_Controller extends Page_Controller {

}