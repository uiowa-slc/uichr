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

class Hero extends DataObject {

  private static $db = array(
    'HeroTitle' => 'Varchar(255)',
    'HeroDescription' => 'Text',
    'SortOrder'=>'Int'
  );

  // One-to-one relationship with parent page
  private static $has_one = array(
    'AssociatedPage' => SiteTree::class,
    'HeroPhoto' => Image::class,
    'HomePage' => 'HomePage'
  );
  private static $owns = array(
    'HeroPhoto'
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