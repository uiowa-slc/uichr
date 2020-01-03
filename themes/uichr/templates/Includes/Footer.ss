<%-- Footer --%>
<footer class="footer" role="contentinfo">
	<div class="container">
		<div class="row">
			<div class="col-md-6">
				<a href="{$BaseHref}" class="footer-logo">
					<img src="{$ThemeDir}/images/UICHR-logo.png" alt="Center for Human Rights logo">
				</a>
				<div class="footer-address clearfix" itemscope itemtype="http://schema.org/LocalBusiness">
					<p>
						<span itemprop="name">$SiteConfig.Title</span><br>
						<span itemprop="streetAddress"><% if $SiteConfig.Address1 %>$SiteConfig.Address1</span> <br><% end_if %>
						<% if $SiteConfig.Address2 %>$SiteConfig.Address2</span> <br><% end_if %>
						<span itemprop="addressLocality">Iowa City</span>, <span itemprop="addressRegion">IA</span> <span itemprop="postalCode">52242</span><br>
					</p>
					<p>
						<% if $SiteConfig.Phone %><span itemprop="telephone">Phone: $SiteConfig.Phone</span> <br><% end_if %>
						<% if $SiteConfig.Fax %><span itemprop="telephone">Fax: $SiteConfig.Fax</span> <br><% end_if %>
						<% if $SiteConfig.Email %>Email: <a href="mailto:$SiteConfig.Email">$SiteConfig.Email</a><% end_if %>
					</p>
				</div>
			</div>
			<div class="col-md-6">

				<div class="donate clearfix">
					<% if $SiteConfig.DonateLink %><a href="$SiteConfig.DonateLink" class="donate-btn" target="_blank">Donate</a><% end_if %>
					<h4>UI Center for Human Rights Fund</h4>
				</div>

				<div class="footer-links">
					<div class="col">
						<ul class="unstyled">
							<li><a href="{$BaseHref}">Home</a></li>
							<% loop Menu(1).Limit(2) %>
								<li><a href="$Link">$Title</a></li>
							<% end_loop %>
						</ul>
					</div>
					<div class="col">
						<ul class="unstyled">
							<% loop Menu(1).Limit(0,2) %>
								<li><a href="$Link">$Title</a></li>
							<% end_loop %>
						</ul>
					</div>
					<div class="col">
						<h4 class="connect">Connect</h4>
						<ul class="social unstyled">
								<% if $SiteConfig.TwitterLink %>
								<li>
									<a href="$SiteConfig.TwitterLink" target="_blank"><img src="{$ThemeDir}/images/twitter-square.png" alt="Twitter icon">Twitter</a>
								</li>
							<% end_if %>
							<% if $SiteConfig.FacebookLink %>
								<li>
									<a href="$SiteConfig.FacebookLink" target="_blank"><img src="{$ThemeDir}/images/facebook-square.png" alt="Facebook icon">Facebook</a>
								</li>
							<% end_if %>
							<li>
								<a href="https://lp.constantcontact.com/su/OyES1hR" target="_blank"><img src="{$ThemeDir}/images/mail.png" alt="newsletter sign up">Email Sign Up</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="copy">
		<div class="container">
			<p class="rights">&copy; {$Now.Year} The University of Iowa. All rights reserved. Created by <a href="https://md.studentlife.uiowa.edu/" target="_blank">M+D</a></p>

		</div>
	</div>
</footer>