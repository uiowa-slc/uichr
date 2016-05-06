<% if $BackgroundPhoto %>
	<div class="page-photo">
		<% include MainNav %>

		<picture>
			<!--[if IE 9]><video style="display: none;"><![endif]-->
			<source srcset="$BackgroundPhoto.CroppedFocusedImage(1200,600).URL" media="(min-width: 980px)">
			<source srcset="$BackgroundPhoto.CroppedFocusedImage(980,600).URL" media="(min-width: 768px)">
			<source srcset="$BackgroundPhoto.CroppedFocusedImage(768,400).URL" media="(min-width: 480px)">
			<!--[if IE 9]></video><![endif]-->
			<img srcset="$BackgroundPhoto.CroppedFocusedImage(480,400).URL" alt="$Title">
		</picture>
	</div>
<% else %>
	<div class="page-photo">
		<% include MainNav %>
		<picture>
			<!--[if IE 9]><video style="display: none;"><![endif]-->
			<source srcset="$SiteConfig.DefaultPhoto.CroppedFocusedImage(1200,400).URL" media="(min-width: 980px)">
			<source srcset="$SiteConfig.DefaultPhoto.CroppedFocusedImage(980,400).URL" media="(min-width: 768px)">
			<source srcset="$SiteConfig.DefaultPhoto.CroppedFocusedImage(768,400).URL" media="(min-width: 480px)">
			<!--[if IE 9]></video><![endif]-->
			<img srcset="$SiteConfig.DefaultPhoto.CroppedFocusedImage(480,400).URL" alt="$Title">
		</picture>
	</div>
<% end_if %>