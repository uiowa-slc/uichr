<?php

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Assets\Image;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TreeDropdownField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Security\Permission;
use SilverStripe\ORM\DataObject;

class Program extends DataObject {

  private static $db = array(
    'ProgramTitle' => 'Varchar(255)',
    'ProgramDescription' => 'Text',
    'SortOrder'=>'Int'
  );

  // One-to-one relationship with parent page
  private static $has_one = array(
    'AssociatedPage' => SiteTree::class,
    'ProgramPhoto' => Image::class,
    'HomePage' => 'HomePage'
  );
  private static $owns = array(
    'ProgramPhoto'
  );

  // Summary fields
  private static $summary_fields = array(
    'ProgramTitle' => 'Title'
  );

  private static $default_sort='SortOrder';

  public function getCMSFields() {

    $thumbField = new UploadField('ProgramPhoto', 'Photo');

    return new FieldList(
      new TextField('ProgramTitle', 'Title'),
      new TextareaField('ProgramDescription', 'Description'),
      new TreeDropdownField('AssociatedPageID', 'Link to this page', SiteTree::class),
      $thumbField
    );

  }

  // public function canView($member = null) {
  //     return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
  // }

  // public function canEdit($member = null) {
  //     return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
  // }

  // public function canDelete($member = null) {
  //     return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
  // }

  // public function canCreate($member = null) {
  //     return Permission::check('CMS_ACCESS_CMSMain', 'any', $member);
  // }
}