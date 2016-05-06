<?php

class EventPage extends Page {

	private static $db = array(
		'Date' => 'Text',

	);
	private static $has_one = array(
		'Picture' => 'Image',
	);
	function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->addFieldToTab("Root.Main", new TextField('Date'));
		$fields->addFieldToTab("Root.Image", new UploadField('Picture'));
		return $fields;
	}
}

class EventPage_Controller extends Page_Controller {

	function init() {
		parent::init();

	}

}
?>