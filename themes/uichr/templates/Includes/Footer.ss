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
					<a href="https://www.givetoiowa.org/GiveToIowa/WebObjects/GiveToIowa.woa/wa/goTo?area=uichr" class="donate-btn">Donate</a>
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
							<li>
								<a href="$SiteConfig.TwitterLink" target="_blank"><img src="{$ThemeDir}/images/twitter-square.png" alt="Twitter icon">Twitter</a>
							</li>
							<li>
								<a href="$SiteConfig.FacebookLink" target="_blank"><img src="{$ThemeDir}/images/facebook-square.png" alt="Facebook icon">Facebook</a>
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
			<div class="newsletter">
				<!-- Begin MailChimp Signup Form -->
				<div id="mc_embed_signup">
					<form action="//uichr.us11.list-manage.com/subscribe/post?u=e00f53e9c4ad5418866b0d924&amp;id=4e940b930b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
					<div id="mc_embed_signup_scroll">
						<h2>Subscribe:</h2>
						<%-- <div class="indicates-required"><span class="asterisk">*</span> indicates required</div> --%>
						<div class="mc-field-group">
							<label for="mce-EMAIL" class="sr-only">Email Address  <span class="asterisk">*</span></label>
							<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
						</div>
					   <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_e00f53e9c4ad5418866b0d924_4e940b930b" tabindex="-1" value=""></div>
					   <div class="mc-submit"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
					   </div>
					   <div id="mce-responses" class="clear">
							<div class="response" id="mce-error-response" style="display:none"></div>
							<div class="response" id="mce-success-response" style="display:none"></div>
						</div>
					</form>
				</div>
				<!--End mc_embed_signup-->
			</div>
		</div>
	</div>
</footer>