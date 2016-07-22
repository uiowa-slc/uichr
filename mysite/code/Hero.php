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

  public function getCMSFields() {

    $thumbField = new UploadField('HeroPhoto', 'Photo');

    return new FieldList(
      new TextField('HeroTitle', 'Title'),
      new TextareaField('HeroDescription', 'Description'),
      new TreeDropdownField('AssociatedPageID', 'Link to this page', 'SiteTree'),
      $thumbField
    );

  }

  public function canView($member = null) {
      return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
  }

  public function canEdit($member = null) {
      return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
  }

  public function canDelete($member = null) {
      return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
  }

  public function canCreate($member = null) {
      return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
  }
}