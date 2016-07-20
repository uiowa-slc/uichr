<?php

class StudentMapPage extends Page {

	private static $db = array(
		'Content' => 'HTMLText',
	);


	public function getCMSFields() {

		$fields = parent::getCMSFields();

		$gridFieldConfigStudents = GridFieldConfig_RecordEditor::create();
		$gridfield = new GridField("StudentsViewer", "Student Viewer", Student::get(), $gridFieldConfigStudents);

		$fields->addFieldToTab('Root.Main', new TextAreaField('Content', 'Content'));

		$fields->addFieldToTab('Root.Main', $gridfield); 

		return $fields;
	}

	public function Students() {
	 	return Student::get(); 
	}



}