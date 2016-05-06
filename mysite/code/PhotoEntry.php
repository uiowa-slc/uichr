<?php

class PhotoEntry extends DataObject {

	private static $db = array(
		'SortOrder'=>'Int',
		'ImageCaption' => 'Varchar(255)'
	);

	// One-to-one relationship with parent page
	private static $has_one = array(
		'Photo' => 'Image',
		'InteriorPage' => 'InteriorPage'
	);

	// Summary fields
	private static $summary_fields = array(
		'Thumbnail'
	);
	function getThumbnail() {
		return $this->Photo()->CMSThumbnail();
	}

	public function getCMSFields_forPopup() {
		$thumbField2 = new UploadField('Photo', 'Logo');
		$thumbField2->allowedExtensions = array('jpg', 'png', 'gif');

		return new FieldList(
			$thumbField2,
			new TextField('ImageCaption', 'ImageCaption')
		);

	}
	private static $default_sort='SortOrder';
}