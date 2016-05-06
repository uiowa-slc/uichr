<?php

class ScheduleHolder extends Page {

	private static $db = array(

	);

	private static $has_one = array(

	);

	private static $allowed_children = array('SchedulePage');

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->removeFieldFromTab("Root.Content", "Content");
		return $fields;
	}

}

class ScheduleHolder_Controller extends Page_Controller {
	public function init() {
		parent::init();

	}

}

?>