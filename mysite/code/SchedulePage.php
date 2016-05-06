<?php

class SchedulePage extends Page {

	private static $defaults = array(

	);

	private static $db = array(

	);

	private static $has_one = array(

		'FileUpload' => 'File',

	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		$fields->removeByName("Content");
		$fields->addFieldToTab('Root.Main', new UploadField('FileUpload', 'Upload file here', null, null, null, 'assets/Uploads/schedules/'));

		return $fields;

	}

}

class SchedulePage_Controller extends Page_Controller {

	public function init() {
		parent::init();

	}

}

?>