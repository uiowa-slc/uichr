<?php

global $project;
$project = 'mysite';

global $database;
$database = 'uichr';

require_once("conf/ConfigureFromEnv.php");

// Calendar::add_extension('CalendarExtension');
// CalendarEvent::add_extension('CalendarEventExtension');

MySQLDatabase::set_connection_charset('utf8');

// Set the current theme. More themes can be downloaded from
// http://www.silverstripe.org/themes/
SSViewer::set_theme('simple');

FulltextSearchable::enable(array('SiteTree'));

// Set the site locale
i18n::set_locale('en_US');

// Enable nested URLs for this site (e.g. page/sub-page/)
if (class_exists('SiteTree')) SiteTree::enable_nested_urls();

SiteConfig::add_extension('SiteConfigExtension');

if(Director::isLive()) {
	Director::forceSSL();
}
GD::set_default_quality(80);
Authenticator::unregister('MemberAuthenticator');
Authenticator::set_default_authenticator('SAMLAuthenticator');