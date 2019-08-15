<?php

use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

class StudentMapPage extends Page {

	private static $db = array(
		'Content' => 'HTMLText',
	);


	public function getCMSFields() {

		$fields = parent::getCMSFields();
		$fields->removeByName("PageTags");

		$gridFieldConfigStudents = GridFieldConfig_RecordEditor::create();
		$gridfield = new GridField("StudentsViewer", "Student Viewer", Student::get(), $gridFieldConfigStudents);

		$fields->addFieldToTab('Root.Main', HTMLEditorField::create('Content', 'Content')->addExtraClass('stacked'));

		$fields->addFieldToTab('Root.Main', $gridfield);

		return $fields;
	}

	public function getStudents() {
	 	return Student::get();
	}



}