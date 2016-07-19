<?php

class Hero extends DataObject {

  private static $db = array(
    'HeroTitle' => 'Varchar(255)',
    'HeroDescription' => 'Text',
    'SortOrder'=>'Int'
  );

  // One-to-one relationship with parent page
  private static $has_one = array(
    'AssociatedPage' => 'SiteTree',
    'HeroPhoto' => 'Image',
    'HomePage' => 'HomePage'
  );

  // Summary fields
  private static $summary_fields = array(
    'HeroTitle' => 'Title'
  );

  private static $default_sort='SortOrder';

  public function getCMSFields_forPopup() {

    $thumbField = new UploadField('HeroPhoto', 'Photo');
    $thumbField = new TreeDropdownField('AssociatedPageID', 'Link to this page', 'SiteTree');

    return new FieldList(
      new TextField('HeroTitle', 'Title'),
      new TextareaField('HeroDescription', 'Description'),
      $thumbField
    );

  }
}