<!-- Footer -->
<footer class="footer" role="contentinfo">
	<div class="container">
		<div class="row">
			<div class="col-sm-12 col-md-3">
				<a href="{$BaseHref}" class="footer-logo">
					<img src="{$ThemeDir}/images/youth-ballet-logo.png" alt="Youth Ballet">
				</a>
			</div>
			<div class="col-sm-6 col-md-3">
				<ul class="footer-nav">
					<% loop Menu(1) %>
						<li><a href="$Link">$MenuTitle</a></li>
					<% end_loop %>
				</ul>
			</div>
			<div class="col-sm-6 col-md-3">
				<p class="footer-address" itemscope itemtype="http://schema.org/LocalBusiness">
					<span itemprop="name">$SiteConfig.Title</span><br>
					<span itemprop="streetAddress"><% if $SiteConfig.Address1 %>$SiteConfig.Address1</span> <br><% end_if %>
					<span itemprop="addressLocality">Iowa City</span>, <span itemprop="addressRegion">IA</span> <span itemprop="postalCode">52242</span><br>
					<% if $SiteConfig.Phone %><span itemprop="telephone">$SiteConfig.Phone</span> <br><% end_if %>
					<% if $SiteConfig.Email %><a href="mailto:$SiteConfig.Email">$SiteConfig.Email</a><% end_if %>
				</p>
			</div>
			<div class="clearfix visible-md-block"></div>
			<div class="col-sm-12 col-md-3">
				<img src="{$ThemeDir}/images/clas_black_arch_solid.png" alt="College of Liberal Arts and Sciences logo" style="display: block;margin: 0 auto;">
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<p class="copy text-center">&copy; {$Now.Year} The University of Iowa. All rights reserved. Created by <a href="https://md.studentlife.uiowa.edu/" target="_blank">M+D</a></p>
			</div>
		</div>
	</div>
</footer>
<%-- <footer class="footer" role="contentinfo">
	<span class="stripes"></span>
	<div class="footer-social">
		<div class="container">
			<h4 class="connect-us">Connect With Us</h4>
			<ul class="clearfix social-icons">
				<% if $SiteConfig.FacebookLink %>
					<li>
						<a href="$SiteConfig.FacebookLink" title="Facebook" target="_blank" class="icon-facebook"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.TwitterLink %>
					<li>
						<a href="$SiteConfig.TwitterLink" title="Twitter" target="_blank" class="icon-twitter"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.FlickrLink %>
					<li>
						<a href="$SiteConfig.FlickrLink" title="Flickr" target="_blank" class="icon-flickr"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.YoutubeLink %>
					<li>
						<a href="$SiteConfig.YoutubeLink" title="Youtube" target="_blank" class="icon-youtube"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.InstagramLink %>
					<li>
						<a href="$SiteConfig.InstagramLink" title="Instagram" target="_blank" class="icon-instagram"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.PinterestLink %>
					<li>
						<a href="$SiteConfig.PinterestLink" title="Pinterest" target="_blank" class="icon-pinterest"></a>
					</li>
				<% end_if %>
				<% if $SiteConfig.WordpressLink %>
					<li>
						<a href="$SiteConfig.WordpressLink" title="Wordpress" target="_blank" class="icon-wordpress"></a>
					</li>
				<% end_if %>
			</ul>
		</div>
	</div>
	<div class="footerlinks">
		<div class="container">
			<div class="link-group">
				<% loop Menu(1).Limit(1) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
			<div class="link-group">
				<% loop Menu(1).Limit(1,1) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1,1) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
			<div class="link-group">
				<% loop Menu(1).Limit(1,2) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1,2) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
			<div class="link-group">
				<% loop Menu(1).Limit(1,4) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1,4) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
			<div class="link-group">
				<% loop Menu(1).Limit(1,5) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1,5) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
			<div class="link-group">
				<% loop Menu(1).Limit(1,7) %>
					<h5 class="title"><a href="$Link">$MenuTitle</a></h5>
				<% end_loop %>
				<ul>
					<% loop Menu(1).Limit(1,7) %>
						<% if Children %>
							<ul>
								<% loop Children.Limit(4) %>
									<li><a href="$Link">$MenuTitle</a></li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_loop %>
				</ul>
			</div>
		</div>
	</div>
	<div class="footer-logos">
		<div class="container clearfix">

		</div>
	</div>
	<div class="copyright">
		<div class="container">
			<p>&copy; The University of Iowa {$Now.Year}. All rights reserved. <% if $SiteConfig.Address1 %>$SiteConfig.Address1 <% end_if %><% if $SiteConfig.Phone %>| $SiteConfig.Phone <% end_if %><% if $SiteConfig.Email %> | <a href="mailto:$SiteConfig.Email">$SiteConfig.Email</a><% end_if %> <a href="http://www.uiowa.edu/homepage/online-privacy-information" target="_blank">Privacy Information</a>
		</div>
	</div>
</footer> --%>