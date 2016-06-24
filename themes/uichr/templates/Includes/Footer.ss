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
				<%-- <div class="social">
					<ul class="unstyled">
						<li>
							<% if $SiteConfig.FacebookLink %>
								<a href="$SiteConfig.FacebookLink"><svg class="icon icon-facebook-square"><use xlink:href="#icon-facebook-square"></use></svg><span class="mls"> Facebook</span></a>
							<% end_if %>
						</li>
						<li>
							<% if $SiteConfig.TwitterLink %>
								<a href="$SiteConfig.TwitterLink"><svg class="icon icon-twitter-square"><use xlink:href="#icon-twitter-square"></use></svg><span class="mls"> Twitter</span></a>
							<% end_if %>
						</li>
					</ul>
				</div> --%>
			</div>
			<div class="col-md-6">
				<div class="newsletter">
					<!-- Begin MailChimp Signup Form -->
					<div id="mc_embed_signup">
						<form action="//uichr.us11.list-manage.com/subscribe/post?u=e00f53e9c4ad5418866b0d924&amp;id=4e940b930b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
							<div id="mc_embed_signup_scroll">
								<h2>Subscribe to our mailing list</h2>
								<%-- 	<div class="indicates-required"><span class="asterisk">*</span> indicates required</div> --%>
								<div class="mc-field-group">
									<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
								</label>
									<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
								</div>
								<div class="mc-field-group size1of3">
									<label for="mce-FNAME">First Name </label>
									<input type="text" value="" name="FNAME" class="" id="mce-FNAME">
								</div>
								<div class="mc-field-group size1of3">
									<label for="mce-LNAME">Last Name </label>
									<input type="text" value="" name="LNAME" class="" id="mce-LNAME">
								</div>
								<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
								<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_e00f53e9c4ad5418866b0d924_4e940b930b" tabindex="-1" value=""></div>
								<div class="mc-submit size1of3"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
								<div id="mce-responses" class="clear">
									<div class="response" id="mce-error-response" style="display:none"></div>
									<div class="response" id="mce-success-response" style="display:none"></div>
								</div>
						   </div>
						</form>
					</div>
					<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
					<!--End mc_embed_signup-->
				</div>
			</div>
		</div>
	</div>
	<p class="copy text-center">&copy; {$Now.Year} The University of Iowa. All rights reserved. Created by <a href="https://md.studentlife.uiowa.edu/" target="_blank">M+D</a></p>
</footer>