<section class="hero">
	<div class="hero-top" style="background-image: url({$ThemeDir}/images/hero-1.jpg)">
		<%-- <img src="{$ThemeDir}/images/hero-1.jpg" alt="" class="hero-img"> --%>
		<div class="container">
			<div class="row">
				<div class="col-md-7">
					<div class="hero-content">
						<h1 class="hero-title">New Ideas for a changing world</h1>
						<p class="hero-copy">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
						<a href="#" class="hero-btn">Eligibility Requirements</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="hero-bot">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<ol class="unstyled clearfix hero-nav">
						<li>
							<a href="#">
								<img src="{$ThemeDir}/images/hero-nav1.jpg" alt="">
								<strong>Certificate in Human Rights</strong>
							</a>
						</li>
						<li>
							<a href="#">
								<img src="{$ThemeDir}/images/hero-nav2.jpg" alt="">
								<strong>Student Internships</strong>
							</a>
						</li>
						<li>
							<a href="#">
								<img src="{$ThemeDir}/images/hero-nav3.jpg" alt="">
								<strong>Weston Essay Prize</strong>
							</a>
						</li>
					</ol>
					<div class="hero-overview">
						<p class="hero-overview-copy">The Human Rights Certificate Program seeks to broaden understanding of human rights issues and to identify solutions to them on an interdisciplinary basis. Labore et dolore magna aliqua enim ad minim veniam.</p>
						<a href="#" class="hero-overview-link"><strong>Program Overview</strong></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<!--workinggroups.jpg-->
<section class="program-container">
	<div class="container">
		<div class="col-sm-12">
			<div class="program-intro clearfix">
				<h3>Protecting Human Rights at home and abroad</h3>
				<p>The UICHR hosts diverse collaborative and innovative events and programs, reaching the UI community, the state of Iowa, and beyond. The center collaborates with community organizations and UI departments, scholars, and student groups. UICHR’s publicly engaged programs and initiatives include:</p>
			</div>
			<div class="program-list">
				<ul class="unstyled justify justify-3">
					<li class="justify-item">
						<a href="#">
							<div class="program-top">
								<img src="{$ThemeDir}/images/onecommunity-onebook.jpg">
								<h4>One Community, One Book</h4>
							</div>
							<div class="program-bot">
								<p>A community reading initiative that features a new book each year that highlights a human rights concern.</p>
								<span>&rsaquo;</span>
							</div>
						</a>
					</li>
					<li class="justify-item">
						<a href="#">
							<div class="program-top">
								<img src="{$ThemeDir}/images/onecommunity-onebook.jpg">
								<h4>Working Groups</h4>
							</div>
							<div class="program-bot">
								<p>A community reading initiative that features a new book each year that highlights a human rights concern.</p>
								<span>&rsaquo;</span>
							</div>
						</a>
					</li>
					<li class="justify-item">
						<a href="#">
							<div class="program-top">
								<img src="{$ThemeDir}/images/onecommunity-onebook.jpg">
								<h4>International Legal Clinic</h4>
							</div>
							<div class="program-bot">
								<p>A community reading initiative that features a new book each year that highlights a human rights concern.</p>
								<span>&rsaquo;</span>
							</div>
						</a>
					</li>
					<li class="justify-item">
						<a href="#">
							<div class="program-top">
								<img src="{$ThemeDir}/images/onecommunity-onebook.jpg">
								<h4>International Legal Clinic</h4>
							</div>
							<div class="program-bot">
								<p>A community reading initiative that features a new book each year that highlights a human rights concern.</p>
								<span>&rsaquo;</span>
							</div>
						</a>
					</li>
					<li class="justify-item">
						<a href="#">
							<div class="program-top">
								<img src="{$ThemeDir}/images/onecommunity-onebook.jpg">
								<h4>International Legal Clinic</h4>
							</div>
							<div class="program-bot">
								<p>A community reading initiative that features a new book each year that highlights a human rights concern.</p>
								<span>&rsaquo;</span>
							</div>
						</a>
					</li>
					<li class="justify-item">
						<a href="#">
							<div class="program-top">
								<img src="{$ThemeDir}/images/onecommunity-onebook.jpg">
								<h4>International Legal Clinic</h4>
							</div>
							<div class="program-bot">
								<p>A community reading initiative that features a new book each year that highlights a human rights concern.</p>
								<span>&rsaquo;</span>
							</div>
						</a>
					</li>
					<li class="justify-item filler"></li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="home-newsevents">
	<div class="container">
		<div class="row">
			<div class="col-md-6">
				<div class="home-events">
					<h3>UICHR Events</h3>
					<% with $Page(events) %>
					<% loop $EventList.Limit(2) %>
						<div class="clearfix">
							<% loop $Dates %>
								<p class="date-time">
									<% with $StartDateTime %>
										<span class="">$Format(M)</span><span class="">$Format(j)</span>
									<% end_with %>
								</p>
							<% end_loop %>
							<h4 class=""><a href="$Link">$Title</a></h4>
							<p><% if $Venue %>$Venue.Title<% end_if %></p>
						</div>
					<% end_loop %>
					<% end_with %>
				</div>
			</div>
			<div class="col-md-6">
				<div class="home-news">
					<% with $Page(news) %>
						<% if $AllChildren %>
							<h3>UICHR News</h3>
							<ul class="unstyled">
								<% loop $BlogPosts.Limit(2) %>
									<li>
										<h4 class="title"><a href="$Link">$Title</a></h4>
										<span class="date">$PublishDate.format(F d)</span>
									</li>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_with %>
				</div>
			</div>
		</div>
	</div>
</section>
